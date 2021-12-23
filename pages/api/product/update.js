import { isAuth } from "../../../shared/utils/auth";
import { updateProduct } from "../../../shared/utils/db/db";

async function handler(req, res) {
    // const slug = req.query.slug;

    const {
        id,
        name,
        slug,
        categories,
        tags,
        images,
        price,
        brand,
        count_in_stock,
        description,
        infos,
        condition,
        related_products,
    } = req.body;
    // console.log("🐸req.body.id:", id);

    try {
        const product = await updateProduct(
            id,
            name,
            slug,
            categories,
            tags,
            JSON.stringify(images),
            price,
            brand,
            count_in_stock,
            description,
            infos,
            condition,
            related_products
        );
        console.log("🐸product:", product.rows[0]);
        res.send({
            message: "Prodotto aggiornato",
            product: product.rows[0],
        });
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

export default isAuth(handler); //middleware
