import { getAllCategories } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let { rows } = await getAllCategories();
        res.send(rows);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
