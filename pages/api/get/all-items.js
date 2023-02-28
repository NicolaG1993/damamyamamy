import { getAllItems } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let { rows } = await getAllItems();
        res.send(rows.reverse());
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}
