/*
POSTGRESQL VERSION
import bcrypt from "bcryptjs";
import { signToken } from "../../../shared/utils/auth";
import { createUser, getAllEmails } from "../../../shared/utils/db/db";

export default async function handler(req, res) {
    const { name, email, password } = req.body;
    console.log("password:", req.body.password);
    const hashedPsw = bcrypt.hashSync(password);

    const emails = await getAllEmails();
    console.log("emails:", emails.rows[0].array);

    if (emails.rows[0].array.includes(email)) {
        return res
            .status(500)
            .json({ message: "Questa email è già in utilizzo" });
    }

    try {
        let user = await createUser(name, email, hashedPsw, false);
        user = user.rows[0];
        console.log("user:", user);
        const token = signToken(user);

        res.send({
            id: user.id,
            name: user.name,
            email: user.email,
            is_admin: user.is_admin,
            profile_pic_url: user.profile_pic_url,
            token,
        });
    } catch (err) {
        return res.status(500).json({ message: "C'è stato un errore" });
    }
}
*/

import bcrypt from "bcryptjs";
import { signToken } from "../../../shared/utils/auth";
import prisma from "../../../shared/libs/prisma";

export default async function handler(req, res) {
    const { name, email, password } = req.body;
    const hashedPsw = bcrypt.hashSync(password);

    try {
        const existingEmail = await prisma.users.findUnique({
            where: { email: email },
        });

        if (existingEmail) {
            return res
                .status(500)
                .json({ message: "Questa email è già in utilizzo" });
        }

        try {
            let user = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: hashedPsw,
                    is_admin: false,
                },
            });

            console.log("user:", user);
            const token = signToken(user);

            res.send({
                id: user.id,
                name: user.name,
                email: user.email,
                is_admin: user.is_admin,
                profile_pic_url: user.profile_pic_url,
                token,
            });
        } catch (err) {
            return res.status(500).json({ message: "C'è stato un errore" });
        }
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured." });
    }
}
