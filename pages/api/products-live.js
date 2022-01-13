/*
POSTGRESQL VERSION
import { getLiveProducts } from "../../shared/utils/db/db";

export default async function handler(req, res) {
    // console.log("liveProducts req.body:", typeof req.body);
    const liveProducts = await getLiveProducts(req.body);
    console.log("liveProducts", liveProducts);

    res.status(200).json(liveProducts.rows);
}

*/

import prisma from "../../shared/libs/prisma";
import { formatJSDate } from "../../shared/utils/convertTimestamp";

export default async function handler(req, res) {
    const data = req.body;
    try {
        let feed = await prisma.products.findMany({
            where: { id: { in: data } },
        });

        feed.map((el) => {
            el.price = Number(el.price);
            el.created_at = formatJSDate(el.created_at);
            return el;
        }); //not serializible data

        res.status(200).json(feed);
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured." });
    }
}
