/*
POSTGRESQL VERSION
import { isAdmin, isAuth } from "../../../shared/utils/auth";
import { allOrders } from "../../../shared/utils/db/db";

async function handler(req, res) {
    let { rows } = await allOrders();

    res.json(rows);
}

export default isAuth(isAdmin(handler));
*/

import prisma from "../../../shared/libs/prisma";
import { isAdmin, isAuth } from "../../../shared/utils/auth";

async function handler(req, res) {
    try {
        let orders = await prisma.orders.findMany();
        res.json(orders);
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured." });
    }
}

export default isAuth(isAdmin(handler));
