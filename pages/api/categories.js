/*
POSTGRESQL VERSION
import { getAllCategories, getAllTags } from "../../shared/utils/db/db";

export default async function handler(req, res) {
    const categories = await getAllCategories();
    const tags = await getAllTags();

    res.status(200).json({
        allCategories: categories.rows[0].array.sort(),
        allTags: tags.rows[0].array.sort(),
    });
}
*/

import prisma from "../../shared/libs/prisma";

export default async function handler(req, res) {
    try {
        let feed = await prisma.products.findMany();

        let allCategories = [];
        let allTags = [];

        feed.map((el) => {
            allCategories = allCategories.concat(el.categories);
            allTags = allTags.concat(el.tags);
        });
        const uniqueCategories = [...new Set(allCategories)].sort();
        const uniqueTags = [...new Set(allTags)].sort();

        res.status(200).json({
            allCategories: uniqueCategories,
            allTags: uniqueTags,
        });
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured." });
    }
}
