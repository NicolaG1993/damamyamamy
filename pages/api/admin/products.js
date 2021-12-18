import { isAuth } from "../../../shared/utils/auth";
import {
    allProducts,
    allProductsAvailables,
} from "../../../shared/utils/db/db";

async function handler(req, res) {
    console.log(" ⭐😭⭐ req.headers: ", req.headers);
    if (req.headers.all === "true") {
        let { rows } = await allProducts();
        res.json(rows);
    } else {
        let { rows } = await allProductsAvailables();
        res.json(rows);
    }
}

export default isAuth(handler);
