import { isAuth } from "../../../../shared/utils/auth";
import { getOrder } from "../../../../shared/utils/db/db";

async function handler(req, res) {
    const id = req.query.id;
    console.log("id:", id);
    const order = await getOrder(id);
    console.log("order:", order.rows);
    res.status(200).json(order);
}

export default isAuth(handler); //middleware
