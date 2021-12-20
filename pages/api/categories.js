import { getAllCategories, getAllTags } from "../../shared/utils/db/db";

export default async function handler(req, res) {
    const categories = await getAllCategories();
    const tags = await getAllTags();

    res.status(200).json({
        allCategories: categories.rows[0].array.sort(),
        allTags: tags.rows[0].array.sort(),
    });
}
