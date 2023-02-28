import { isAdmin, isAuth } from "@/utils/auth";
import { getAllOrders } from "@/utils/db/db";

async function handler(req, res) {
    try {
        let { rows } = await getAllOrders();
        res.send(rows.reverse());
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}

export default isAuth(isAdmin(handler));
