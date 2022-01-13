import { isAuth } from "../../../shared/utils/auth";
/*
import { newOrder, getLiveProducts } from "../../../shared/utils/db/db";


async function handler(req, res) {
    console.log("🐸 req.body :", req.body);
    console.log("🐸 req.user.id :", req.user.id);

    const itemsIDs = req.body.order_items.map((el) => el.itemId);
    console.log("itemsIDs:", itemsIDs); //undefined

    //ricevo lo stock degli item di order (o direttamente gli items?)
    const liveProducts = await getLiveProducts(itemsIDs); //devo passargli gli id
    console.log("liveProducts:", liveProducts);
    //con i liveProducts filtro quelli che sono ancora in stock > 0
    //se qualcuno viene eliminato va aggiornato l'ordine (e mostrato alert)
    // meglio interrompere e dare solo alert
    //se tutto ok si puo effettuare creare l'ordine

    let soldOutItems = req.body.order_items.filter(
        (el) => {
            const product = liveProducts.rows.find((it) => el.itemId === it.id);
            if (product.count_in_stock < el.quantity) {
                if (product.count_in_stock < 1) {
                    //delete from cart
                    return {
                        id: product.id,
                        name: product.name,
                        newQuantity: 0,
                    };
                } else if (product.count_in_stock > 0) {
                    //set new quantity for item in cart = product.count_in_stock
                    return {
                        id: product.id,
                        name: product.name,
                        newQuantity: product.count_in_stock,
                    };
                }
            } else {
                //dont push
                return;
            }
        } //questa potrebbe diventare un utils, che posso usare in altri component 🧠

        // el.count_in_stock < 1 //devo cercare minore di 1 o di quantitá richiesta
    ); //devo mappare req.body.order_items
    // per ogni el mi serve el.quantity e el.itemId
    // looppo liveProducts e comparo el.quantity e it.count_in_stock, basandomi su el.itemId e it.id

    if (!soldOutItems.length) {
        // 🧨 questa API viene chiamata dopo che ordine é stato pagato! il check stock andrebbe prima del pagamento
        try {
            const data = await newOrder({
                ...req.body,
                user_id: req.user.id,
                order_items: JSON.stringify(req.body.order_items),
            });
            // console.log("data🐸:", data.rows[0]);
            res.status(201).json(data.rows[0]);
        } catch (err) {
            if (err.name === "UnauthorizedError") {
                // jwt authentication error
                return res.status(401).json({ message: "Invalid Token" });
            }

            // default to 500 server error
            console.error("🐸 err: ", err);
            return res.status(500).json({ message: err.message });
        }
        //da testare
    } else {
        return res.status(500).json({
            message:
                "Qualcuno ha giá acquistato uno o piú prodotti, il tuo carrello é stato aggiornato",
            // soldOutItems: soldOutItems,
        }); //soldOutItems non mi serve a nulla al momento
    }

    //fare err status 500 , server error
    //ad esempio quando manca payment method o altri required values, oppure errori
    // fare try catch ?
}
*/

/*
POSTGRESQL VERSION
// questa é la versione senza check live stock
// visto che quando arriviamo qua il pagamento é giá stato approvato su stripe o paypal
// almeno admin puo vedere ordine in dashboard e annullarlo, visto che conservo tutta la response dell'ordine in db
// dovró creare una feature per annullare ordine e ritornare denaro 🧠
async function handler(req, res) {
    try {
        const data = await newOrder({
            ...req.body,
            user_id: req.user.id,
            order_items: JSON.stringify(req.body.order_items),
        });
        res.status(201).json(data.rows[0]);
    } catch (err) {
        if (err.name === "UnauthorizedError") {
            // jwt authentication error
            return res.status(401).json({ message: "Invalid Token" });
        }
        // default to 500 server error
        console.error("🐸 err: ", err);
        return res.status(500).json({ message: err.message });
    }
}

export default isAuth(handler); //middleware

*/

import prisma from "../../../shared/libs/prisma";

async function handler(req, res) {
    try {
        const order = await prisma.orders.create({
            data: {
                ...req.body,
                user_id: req.user.id,
                order_items: req.body.order_items,
            },
        });
        console.error("🐸 order: ", order);
        res.status(201).json(order);
    } catch (err) {
        if (err.name === "UnauthorizedError") {
            // jwt authentication error
            return res.status(401).json({ message: "Invalid Token" });
        }
        // default to 500 server error
        console.error("🐸 err: ", err);
        return res.status(500).json({ message: err.message });
    }
}
export default isAuth(handler);
