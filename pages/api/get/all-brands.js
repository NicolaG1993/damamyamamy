import { getAllBrands } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let { rows } = await getAllBrands();
        res.send(rows);
    } catch (err) {
        res.status(500).json({ message: "Internal server error" });
    }
}
