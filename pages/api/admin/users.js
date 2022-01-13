/*
POSTGRESQL VERSION
import { isAdmin, isAuth } from "../../../shared/utils/auth";
import { allUsers } from "../../../shared/utils/db/db";



async function handler(req, res) {
    let { rows } = await allUsers();

    res.json(rows);
}

export default isAuth(isAdmin(handler));
*/

import prisma from "../../../shared/libs/prisma";
import { isAdmin, isAuth } from "../../../shared/utils/auth";

async function handler(req, res) {
    try {
        let feed = await prisma.users.findMany();

        //  feed.map((el) => {
        //  el.price = Number(el.price);
        //  el.created_at = formatJSDate(el.created_at);
        //  return el;
        //  }); //not serializible data

        res.status(200).json(feed);
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured." });
    }
}

export default isAuth(isAdmin(handler));
