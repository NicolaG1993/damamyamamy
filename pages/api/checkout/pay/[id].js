import { isAuth } from "@/utils/auth";
import { payOrder, updateStock } from "@/utils/db/db";

async function handler(req, res) {
    try {
        console.log("🧟‍♂️ req.body api/checkout/pay/[id] : ", req.body);
        console.log("🧟‍♂️ req.user : ", req.user);

        // check user.id e order.userid
        let loggedUserID = req.user.id;
        const paymentResult = req.body;
        const orderID = Number(req.query.id);
        // update order with payment infos
        // update item table count_in_stock - quantity

        // come fare check user su order?
        let payedOrder = await payOrder(orderID, loggedUserID, paymentResult); // id, loggedUserID, is_paid, paid_at, payment_result
        if (!payedOrder.rows.length) {
            // ...
            res.status(401).send({
                message: "Your are not authorized to pay this order.",
            });
        } else {
            // ...
            // console.log("💚 payedOrder : ", payedOrder.rows[0].order_items);

            let order_items = payedOrder.rows[0].order_items;
            console.log("💚 order_items : ", order_items);

            let ids = [];
            let quantities = [];
            order_items.map((el) => {
                ids.push(Number(el.id));
                quantities.push(Number(el.quantity));
            });
            console.log("💚 ids : ", ids);
            console.log("💚 quantities : ", quantities);

            let stockResponse = await updateStock(ids, quantities); // passare [id, id, ...], [quantity, quantity, ...]
            console.log("💚 stockResponse : ", stockResponse.rows);

            res.status(200).send({
                payedOrder: payedOrder.rows[0],
                stockResponse: stockResponse.rows,
            });
        }
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).send({
            message: "Error occured updating the order in database.",
        });
    }
}

export default isAuth(handler);
// middleware ! 🧠 user puo pagare solo se id di order corrisponde!
// mi basta fare condition dentro request, non serve middleware in questo caso
