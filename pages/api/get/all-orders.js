import { isAuth } from "@/utils/auth";
import { getOrders } from "@/utils/db/db";

async function handler(req, res) {
    try {
        let { rows } = await getOrders(req.user.id);
        let orders = rows;
        res.status(200).send(orders);
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ message: "Error occured." });
    }
}

// middleware matching user or admin only! 🔍🧠🔍
// ma in teoria isAuth torna solo id presente in secretcookie, si puo aggirare via client?
// per admin meglio fare route separata in cui si puo scegliere user.id
export default isAuth(handler);
