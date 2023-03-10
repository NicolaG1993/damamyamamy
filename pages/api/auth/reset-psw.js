import bcrypt from "bcryptjs";
// import { signToken } from "@/utils/auth";
import { getCode, editPassword } from "@/utils/db/db";

export default async function handler(req, res) {
    const { body, method } = req;
    const { code, password } = body;
    if (method === "POST") {
        try {
            // get code, if exists in db
            let { rows } = await getCode(code);
            if (rows && rows.length) {
                const email = rows[0].email;
                //bcrypt password
                const hashedPsw = bcrypt.hashSync(password);
                //update user.password in db
                await editPassword(email, hashedPsw);
                res.send(email);
            } else {
                res.status(401).send({ message: "Il codice non é valido" });
            }
        } catch (err) {
            console.log("ERROR: ", err);
            res.status(500).json({ err: "Error occured." });
        }
    } else {
        return res.status(404).send("Not found");
    }
}
