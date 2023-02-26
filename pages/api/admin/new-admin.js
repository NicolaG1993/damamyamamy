import { isAdmin, isAuth } from "@/utils/auth";
import { upgradeUser } from "@/utils/db/db";

async function handler(req, res) {
    try {
        const id = Number(req.body.id);
        let { rows } = await upgradeUser(id);
        if (rows.length) {
            let user = rows[0];
            res.send(user);
        } else {
            res.status(401).send({ message: "Invalid user ID" });
        }
    } catch (error) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
        // res.status(403).json({ err: "Forbidden." });
    }
}

export default isAuth(isAdmin(handler));
