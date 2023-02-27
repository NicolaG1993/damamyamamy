import { getElementByID } from "@/utils/db/db";

export default async function handler(req, res) {
    const id = Number(req.query.id);
    try {
        let { rows } = await getElementByID("users", id);
        if (rows.length) {
            let user = rows[0];
            res.status(200).send(user);
        } else {
            res.status(404).send({ message: "No user founded with this ID." });
        }
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ message: "Error occured." });
    }
}

// middleware! check if user id match logged user id
