import { isAdmin, isAuth } from "../../../shared/utils/auth";
import { deleteProduct } from "../../../shared/utils/db/db";

async function handler(req, res) {
    // const slug = req.query.slug;

    const { id } = req.body;
    console.log("🐸req.body:", req.body);

    try {
        const product = await deleteProduct(id);
        console.log("🐸product:", product.rows[0]);
        res.send({
            message: "Prodotto eliminato",
            product: product.rows[0],
        });
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

export default isAuth(isAdmin(handler)); //middleware
