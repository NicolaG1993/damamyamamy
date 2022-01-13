/*
POSTGRESQL VERSION
import { getAllProducts, getAllCategories } from "../../shared/utils/db/db";

export default async function handler(req, res) {
    const products = await getAllProducts();
    const categories = await getAllCategories();

    const data = {
        products: products.rows,
        categories: categories.rows[0].array.sort(),
    };
    res.status(200).json(data);
}

*/

import prisma from "../../shared/libs/prisma";
import { formatJSDate } from "../../shared/utils/convertTimestamp";

export default async function handler(req, res) {
    // const data = req.body;
    try {
        let feed = await prisma.products.findMany();

        let allCategories = [];
        feed.map((el) => {
            allCategories = allCategories.concat(el.categories);
            console.log("el", el);
        });
        const uniqueCategories = [...new Set(allCategories)].sort();

        feed.map((el) => {
            el.price = Number(el.price);
            el.created_at = formatJSDate(el.created_at);
            return el;
        }); //not serializible data

        const data = {
            products: feed,
            categories: uniqueCategories,
        };

        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured." });
    }
}
