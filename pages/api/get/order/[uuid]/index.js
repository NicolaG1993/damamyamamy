import { isAuth } from "@/utils/auth";
import { getOrderByUUID } from "@/utils/db/db";

async function handler(req, res) {
    const loggedUser = req.user;
    const uuid = req.query.uuid;
    try {
        let { rows } = await getOrderByUUID(uuid);
        if (rows.length) {
            let order = rows[0];
            if (
                Number(order.user_id) === Number(loggedUser.id) ||
                loggedUser.is_admin
            ) {
                res.status(200).send(order);
            } else {
                res.status(401).send({
                    message: "Non sei autorizzato.",
                });
            }
        } else {
            res.status(404).send({
                message: "Nessun ordine trovato.",
            });
        }
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ message: "Error occured." });
    }
}

export default isAuth(handler);
