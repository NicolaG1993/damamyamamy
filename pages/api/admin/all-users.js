import { isAdmin, isAuth } from "@/utils/auth";
import { getAllUsers } from "@/utils/db/db";

async function handler(req, res) {
    try {
        let { rows } = await getAllUsers();
        res.send(rows);
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}

export default isAuth(isAdmin(handler));
