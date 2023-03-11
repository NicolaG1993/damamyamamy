import { isAdmin, isAuth } from "@/utils/auth";
import { confirmShipping } from "@/utils/db/db";

async function handler(req, res) {
    try {
        const { uuid } = req.body;
        let { rows } = await confirmShipping(uuid);
        let order = rows[0];
        res.send(order);
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ message: "🤖 Server Error." });
    }
}

export default isAuth(isAdmin(handler));
