import bcrypt from "bcryptjs";
import { signToken } from "@/utils/auth";
import { newUser, getUserByEmail } from "@/utils/db/db";
import { sendEmail } from "@/utils/libs/ses";

export default async function handler(req, res) {
    const { body, method } = req;
    const { firstName, lastName, email, password, captcha } = body;

    if (method === "POST") {
        try {
            const hashedPsw = bcrypt.hashSync(password);
            // check unique email
            const existingEmail = await getUserByEmail(email);
            if (existingEmail.rows.length) {
                return res
                    .status(500)
                    .json({ message: "Questa email è già in utilizzo" });
            } else {
                // register new user
                const response = await newUser(
                    firstName,
                    lastName,
                    email,
                    hashedPsw
                );
                console.log("user: ", response.rows[0]);
                let user = response.rows[0];
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
            }
        } catch (err) {
            console.log("ERROR: ", err);
            res.status(500).json({ message: "Error occured." });
        }
    } else {
        // Return 404 if someone pings the API with a method other than POST
        return res.status(404).send("Not found");
    }
}
