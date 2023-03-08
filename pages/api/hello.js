import { getHomeItems } from "@/utils/db/db";

export default async function handler(req, res) {
    try {
        let { rows } = await getHomeItems();

        let lastItems = [];
        let lowerPrice;

        if (rows && rows.length) {
            // return last 3 items
            lastItems = rows.slice(0, 3);
            // return lower price in last 20 items
            lowerPrice = rows.sort(
                (a, b) => Number(a.price) - Number(b.price)
            )[0];
        }

        res.send({ lastItems, lowerPrice });
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}
