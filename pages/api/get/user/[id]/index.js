import { isAuth } from "@/utils/auth";
import { getElementByID } from "@/utils/db/db";

async function handler(req, res) {
    const loggedUser = req.user;
    const id = Number(req.query.id);
    try {
        let { rows } = await getElementByID("users", id);
        if (rows.length) {
            let user = rows[0];
            if (
                Number(user.id) === Number(loggedUser.id) ||
                loggedUser.is_admin
            ) {
                res.status(200).send(user);
            } else {
                res.status(401).send({
                    message: "Non sei autorizzato.",
                });
            }
        } else {
            res.status(404).send({ message: "No user founded with this ID." });
        }
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ message: "Error occured." });
    }
}

export default isAuth(handler);
// 🧠 middleware! check if user id match logged user id ??? ma come -- testare se chiunqe puo richiedere questa API
// ma dove la uso questa?
// la uso in utils/custom/checks.js
