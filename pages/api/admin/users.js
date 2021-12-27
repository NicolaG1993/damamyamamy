import { isAdmin, isAuth } from "../../../shared/utils/auth";
import { allUsers } from "../../../shared/utils/db/db";

async function handler(req, res) {
    let { rows } = await allUsers();

    res.json(rows);
}

export default isAuth(isAdmin(handler));
