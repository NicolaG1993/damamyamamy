/*
POSTGRESQL VERSION
import { getProduct, getRelatedProducts } from "../../../../shared/utils/db/db";

export default async function handler(req, res) {
    const slug = req.query.id;
    // console.log("slug:", slug);
    let { rows } = await getProduct(slug);
    // console.log("rows:", rows);

    if (rows[0].related_products) {
        const resp = await getRelatedProducts(rows[0].related_products); // related_products viene rimpiazzato con array di prodotti invece di IDs
        // console.log("resp:", resp);
        rows[0].related_products = resp.rows;
    }
    res.status(200).json(rows[0]);
}
*/

import prisma from "../../../../shared/libs/prisma";

export default async function handler(req, res) {
    const slug = req.query.id;

    try {
        let product = await prisma.products.findUnique({
            where: {
                slug: slug,
            },
        });

        if (product.related_products) {
            const resp = await prisma.products.findMany({
                where: { id: { in: product.related_products } },
            });

            product.related_products = resp;
        }
        res.status(200).json(product);
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}
