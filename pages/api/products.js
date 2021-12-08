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
