import { isAdmin, isAuth } from "@/utils/auth";
import { newTag } from "@/utils/db/db";
async function handler(req, res) {
    try {
        const value = req.body.value;
        let { rows } = await newTag(value);
        res.send(rows[0]);
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}
export default isAuth(isAdmin(handler));
