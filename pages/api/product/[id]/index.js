import { getProduct, getRelatedProducts } from "../../../../shared/utils/db/db";

export default async function handler(req, res) {
    const slug = req.query.id;
    console.log("slug:", slug);
    let { rows } = await getProduct(slug);
    console.log("rows:", rows);

    if (rows[0].related_products) {
        const resp = await getRelatedProducts(rows[0].related_products); // related_products viene rimpiazzato con array di prodotti invece di IDs
        console.log("resp:", resp);
        rows[0].related_products = resp.rows;
    }
    res.status(200).json(rows[0]);
}
