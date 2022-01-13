/*
async function handlerA(req, res) {
    const id = req.query.id;
    // console.log("id:", id);
    const order = await getOrder(id);
    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now;
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            email_address: req.body.email_address,
        };
        const paidOrder = await order.save(); //non esiste save() // devo forse fare update in db? questa é PUT request
        // res.status(200).json(order);
        console.log("paidOrder:", paidOrder);
        res.status(200).send({ message: "order paid", order: paidOrder });
    } else {
        res.status(404).send({ message: "order not found" });
    }
} 
*/

/*
POSTGRESQL VERSION
import { isAuth } from "../../../../shared/utils/auth";
import {
    getOrder,
    updateOrder,
    updateStock,
} from "../../../../shared/utils/db/db";

async function handler(req, res) {
    const id = req.query.id;
    const order = await getOrder(id);

    if (order) {
        //probabilmete ha piu senso farlo quando creo ordine, e qua modificare solo db dopo pagamento ;)
        // console.log("🥶 order:", order.rows[0]);
        // console.log("🥶 req.body:", req.body);

        const paymentResult = req.body;
        const paidOrder = await updateOrder(id, true, paymentResult);

        let allIDs = [];
        let allQuantities = [];

        paidOrder.rows[0].order_items.map((el) => {
            if (el.itemId && el.quantity) {
                allIDs.push(el.itemId);
                allQuantities.push(el.quantity);
            } else {
                res.status(500).send({
                    message: "Errore in DB: update stock",
                    order: paidOrder,
                });
            } // se questo check se fallisce il pagamento é gia stato effettuato
            // lo sposto prima del pagamento , ma alla fine a user non interessa, quindi torno paidOrder
        });

        // console.log("paidOrder", paidOrder);

        updateStock(allIDs, allQuantities)
            .then((responseStock) => {
                // console.log("stock updated! :", responseStock.rows[0]);
                res.status(200).send({
                    message: "Articoli acquistati!",
                    order: paidOrder,
                });
            })
            .catch((err) => {
                console.log("err", err);
                res.status(500).send({
                    message: err.message,
                    order: paidOrder,
                });
            }); //devo fare la parte in db per updateStock
        //update multiple rows in one query, passing a json with id and quantity keys

        //devo passare tutti gli id e tutte le quantitá richieste
        //potrei anche vedere in tempo reale item in stock, e se 0 rimuoverle da ordine
        // const newStock = await updateStock();
        //attenzione perché il pagamento avviene prima!
        //quindi devo avere stock live in anticipo
        //poi si piazza e si paga l'ordine
        //e subito dopo si aggiorna stock in db

        // console.log("paidOrder:", paidOrder);
    } else {
        res.status(404).send({ message: "Ordine non trovato" });
    }
}

export default isAuth(handler); //middleware

*/

import prisma from "../../../../shared/libs/prisma";
import { isAuth } from "../../../../shared/utils/auth";

async function handler(req, res) {
    const id = Number(req.query.id);

    try {
        let order = await prisma.orders.findUnique({
            where: {
                order_id: id,
            },
        });
        let user = await prisma.users.findUnique({
            where: {
                id: order.user_id,
            },
        });

        if (order) {
            const paymentResult = req.body;

            const paidOrder = await prisma.orders.update({
                where: {
                    order_id: id,
                },
                data: {
                    is_paid: true,
                    paid_at: new Date().toISOString(),
                    payment_result: paymentResult,
                },
            });

            let dbData = [];
            console.log("paidOrder: ", paidOrder);
            paidOrder.order_items.map((el) => {
                if (el.itemId && el.quantity) {
                    dbData.push({ id: el.itemId, quantity: el.quantity });
                } else {
                    res.status(500).send({
                        message: "Errore in DB: update stock",
                        order: paidOrder,
                    });
                }
            });

            //testare
            prisma
                .$transaction(
                    dbData.map((el) =>
                        prisma.products.update({
                            where: { id: el.id },
                            data: {
                                count_in_stock: { decrement: el.quantity },
                            },
                        })
                    )
                )
                .then((responseStock) => {
                    res.status(200).send({
                        message: "Articoli acquistati!",
                        order: paidOrder,
                    });
                })
                .catch((err) => {
                    console.log("err", err);
                    res.status(500).send({
                        message: err.message,
                        order: paidOrder,
                    });
                });
        } else {
            res.status(404).send({ message: "Ordine non trovato" });
        }
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

export default isAuth(handler);
