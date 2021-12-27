import { isAdmin, isAuth } from "../../../shared/utils/auth";
import { allOrders } from "../../../shared/utils/db/db";

async function handler(req, res) {
    let { rows } = await allOrders();

    res.json(rows);
}

export default isAuth(isAdmin(handler));
