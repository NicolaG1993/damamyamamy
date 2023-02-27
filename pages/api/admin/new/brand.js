import { isAdmin, isAuth } from "@/utils/auth";
import { newBrand } from "@/utils/db/db";
async function handler(req, res) {
    try {
        const value = req.body.value;
        let { rows } = await newBrand(value);
        console.log("💚 rows: ", rows);
        res.send(rows[0]);
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}
export default isAuth(isAdmin(handler));
