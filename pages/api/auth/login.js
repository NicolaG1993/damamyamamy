import bcrypt from "bcryptjs";
import { signToken } from "@/utils/auth";
import { getUserByEmail } from "@/utils/db/db";

export default async function handler(req, res) {
    const { body, method } = req;
    const { email } = body;
    if (method === "POST") {
        try {
            let { rows } = await getUserByEmail(email);
            if (rows.length) {
                let user = rows[0];
                if (bcrypt.compareSync(req.body.password, user.psw)) {
                    const token = signToken(user);
                    res.send({
                        id: user.id,
                        firstName: user.first_name,
                        lastName: user.last_name,
                        email: user.email,
                        is_admin: user.is_admin,
                        pic: user.pic,
                        token: token,
                    });
                } else {
                    res.status(401).send({ message: "Invalid password" });
                }
            } else {
                res.status(401).send({ message: "Invalid email" });
            }
        } catch (err) {
            console.log("ERROR: ", err);
            res.status(500).json({ err: "Error occured." });
        }
    } else {
        return res.status(404).send("Not found");
    }
}
