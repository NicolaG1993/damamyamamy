import { getHomeItems } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let { rows } = await getHomeItems();
        // return last 3 items
        let lastItems = rows.slice(0, 3);
        // return lower price in last 20 items
        let lowerPrice = rows.sort(
            (a, b) => Number(a.price) - Number(b.price)
        )[0];

        res.send({ lastItems, lowerPrice });
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}
