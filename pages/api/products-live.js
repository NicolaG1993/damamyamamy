import { getLiveProducts } from "../../shared/utils/db/db";

export default async function handler(req, res) {
    // console.log("liveProducts req.body:", typeof req.body);
    const liveProducts = await getLiveProducts(req.body);
    console.log("liveProducts", liveProducts);

    res.status(200).json(liveProducts.rows);
}
