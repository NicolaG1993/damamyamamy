import { getOrderByUUID } from "@/utils/db/db";

export default async function handler(req, res) {
    const uuid = req.query.uuid;
    try {
        let { rows } = await getOrderByUUID(uuid);
        if (rows.length) {
            let order = rows[0];
            res.status(200).send(order);
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

// middleware matching user and admin only! 🔍🧠🔍
