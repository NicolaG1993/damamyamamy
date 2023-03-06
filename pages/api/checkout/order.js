import { isAuth } from "@/utils/auth";
import { newOrder } from "@/utils/db/db";

async function handler(req, res) {
    try {
        let parsedItems = req.body.order_items.map(
            ({ id, name, quantity, price }) => ({ id, name, quantity, price })
        );
        console.log(
            "req.body api/checkout/order : ",
            req.user.id,
            req.body,
            parsedItems
        );
        // ...

        // Ho una table per salvare le relation item_order
        // devo peró salvare il prezzo e quantitá di ogni articolo in ordine
        // perché prezzo o item potrebbe essere modificato in futuro ma in order non deve cambiare
        // mi chiedo se queste info vengono giá salvate in stripe e paypal order

        let { rows } = await newOrder({
            ...req.body,
            user_id: req.user.id,
            order_items: JSON.stringify(parsedItems),
        });
        //create order in DB
        console.error("🐸 new order: ", rows[0]);
        res.status(200).send(rows[0]);
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).send({ message: "Error occured." });
    }
}

export default isAuth(handler);

/**
    user_id,
    shipping_address,
    payment_method,
    payment_result,
    order_items,
    items_price,
    shipping_price,
    tax_price,
    total_price,
    is_paid,
    is_delivered,
    paid_at,
    delivered_at,
 */

/*
    
    user_id: userInfo.id,
    order_items: cartData,
    shipping_address: shippingAddress,
    payment_method: paymentMethod,
    payment_result: undefined,
    items_price,
    shipping_price,
    tax_price,
    total_price,

*/
