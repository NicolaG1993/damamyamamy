import { isAdmin } from "@/utils/auth";
import { getOrders } from "@/utils/db/db";

async function handler(req, res) {
    try {
        let { rows } = await getOrders(req.body.id);
        let orders = rows;
        res.status(200).send(orders);
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ message: "Error occured." });
    }
}
export default isAdmin(handler);
