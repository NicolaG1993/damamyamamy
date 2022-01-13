/*
POSTGRESQL VERSION
import { isAuth } from "../../../../shared/utils/auth";
import { getUser } from "../../../../shared/utils/db/db";

async function handler(req, res) {
    const id = req.query.id;
    console.log("id:", id);
    const user = await getUser(Number(id));
    console.log("user:", user);
    res.status(200).json(user);
}

export default isAuth(handler); //middleware
*/

import { isAuth } from "../../../../shared/utils/auth";
import prisma from "../../../../shared/libs/prisma";

async function handler(req, res) {
    let id = req.query.id;
    id = Number(id);
    console.log("ID:", id);

    try {
        let user = await prisma.users.findFirst({
            where: { id: id },
        });
        res.status(200).json(user);
    } catch (err) {
        console.log(err);
        res.status(401).send({ message: "Invalid ID" });
    }
}

export default isAuth(handler);
