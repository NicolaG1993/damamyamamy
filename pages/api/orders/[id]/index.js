/*
POSTGRESQL VERSION
import { isAuth } from "../../../../shared/utils/auth";
import { getOrder } from "../../../../shared/utils/db/db";

async function handler(req, res) {
    const id = req.query.id;
    console.log("id:", id);
    const order = await getOrder(id);
    console.log("order:", order.rows);
    res.status(200).json(order);
}

export default isAuth(handler); //middleware
*/

import prisma from "../../../../shared/libs/prisma";
import { isAuth } from "../../../../shared/utils/auth";

async function handler(req, res) {
    const id = Number(req.query.id);

    try {
        let order = await prisma.orders.findFirst({
            where: {
                order_id: id,
            },
        });
        let user = await prisma.users.findFirst({
            where: {
                id: order.user_id,
            },
        });

        res.status(200).json({ ...order, ...user }); //non so se sia JOIN nel formato corretto cosí
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

export default isAuth(handler); //middleware
