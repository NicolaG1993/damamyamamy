import { isAuth } from "../../../shared/utils/auth";
import {
    allProducts,
    allProductsAvailables,
    allProductsOutOfStock,
} from "../../../shared/utils/db/db";

async function handler(req, res) {
    console.log(" ⭐😭⭐ req.headers: ", req.headers);
    if (req.headers.all === "true") {
        let { rows } = await allProducts();
        res.json(rows);
    } else {
        if (req.headers.stock === "true") {
            let { rows } = await allProductsAvailables();
            res.json(rows);
        } else {
            let { rows } = await allProductsOutOfStock();
            res.json(rows);
        }
    }
}

export default isAuth(handler);
