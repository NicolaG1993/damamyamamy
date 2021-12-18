import { isAuth } from "../../../../shared/utils/auth";
import { getUser } from "../../../../shared/utils/db/db";

async function handler(req, res) {
    const id = req.query.id;
    console.log("id:", id);
    const user = await getUser(id);
    console.log("user:", user);
    res.status(200).json(user);
}

export default isAuth(handler); //middleware
