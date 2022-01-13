/*
POSTGRESQL VERSION
import bcrypt from "bcryptjs";
import { signToken } from "../../../shared/utils/auth";
import { getUserByEmail } from "../../../shared/utils/db/db";

export default async function handler(req, res) {
    const email = req.body.email;
    let user = await getUserByEmail(email);
    console.log("user:", user);
    user = user.rows[0];

    if (user) {
        // if (req.body.password === user.password) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            const token = signToken(user);
            res.send({
                id: user.id,
                name: user.name,
                email: user.email,
                is_admin: user.is_admin,
                profile_pic_url: user.profile_pic_url,
                token,
            });
        } else {
            res.status(401).send({ message: "Invalid password" });
        }
    } else {
        res.status(401).send({ message: "Invalid email" });
    }
}
*/

import bcrypt from "bcryptjs";
import { signToken } from "../../../shared/utils/auth";

import prisma from "../../../shared/libs/prisma";

export default async function handler(req, res) {
    const email = req.body.email;

    try {
        let user = await prisma.users.findUnique({
            where: { email: email },
        });

        if (user) {
            // if (req.body.password === user.password) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                const token = signToken(user);
                res.send({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    is_admin: user.is_admin,
                    profile_pic_url: user.profile_pic_url,
                    token,
                });
            } else {
                res.status(401).send({ message: "Invalid password" });
            }
        } else {
            res.status(401).send({ message: "Invalid email" });
        }
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured." });
    }
}
