import { isAuth } from "../../../shared/utils/auth";
import { allProducts } from "../../../shared/utils/db/db";

async function handler(req, res) {
    let { rows } = await allProducts();

    res.json(rows);
}

export default isAuth(handler);
