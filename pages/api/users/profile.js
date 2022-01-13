/*
POSTGRESQL VERSION
import bcrypt from "bcryptjs";
import { isAuth, signToken } from "../../../shared/utils/auth";
import { updateUser } from "../../../shared/utils/db/db";

async function handler(req, res) {
    let { id, name, email, password } = req.body;
    console.log("password:", req.body.password);

    if (name === "") {
        name = null;
    }
    if (email === "") {
        email = null;
    }
    if (password === "") {
        password = null;
    }
    if (password !== null) {
        password = bcrypt.hashSync(password);
    }

    let user = await updateUser(id, name, email, password);

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
}

export default isAuth(handler); //middleware
*/

import bcrypt from "bcryptjs";
import { isAuth, signToken } from "../../../shared/utils/auth";
import prisma from "../../../shared/libs/prisma";

async function handler(req, res) {
    let { id, name, email, password } = req.body;

    if (name === "") {
        name = undefined;
    }
    if (email === "") {
        email = undefined;
    }
    if (password === "") {
        password = undefined;
    }
    if (password !== undefined) {
        password = bcrypt.hashSync(password);
    }
    //COALESCE 🧠 if undefined dont update
    try {
        let user = await prisma.users.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                email: email,
                password: password,
            },
        });

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
        console.log(err);
        res.status(403).json({ err: "Error occured." });
    }
}

export default isAuth(handler);
