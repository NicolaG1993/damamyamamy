/*
POSTGRESQL VERSION
import { isAuth, isAdmin } from "../../../shared/utils/auth";
import {
    allProducts,
    allProductsAvailables,
    allProductsOutOfStock,
} from "../../../shared/utils/db/db";

async function handler(req, res) {
    console.log(" ⭐😭⭐ req.headers: ", req.headers);
    if (req.headers.all === "true") {
        let { rows } = await allProducts();
        res.json(rows);
    } else {
        if (req.headers.stock === "true") {
            let { rows } = await allProductsAvailables();
            res.json(rows);
        } else {
            let { rows } = await allProductsOutOfStock();
            res.json(rows);
        }
    }
}

export default isAuth(isAdmin(handler));

// import nc from "next-connect";
*/

import prisma from "../../../shared/libs/prisma";
import { isAuth, isAdmin } from "../../../shared/utils/auth";

async function handler(req, res) {
    try {
        if (req.headers.all === "true") {
            const products = await prisma.products.findMany();
            res.json(products);
        } else {
            if (req.headers.stock === "true") {
                const products = await prisma.products.findMany({
                    where: { count_in_stock: { gt: 0 } },
                });
                res.json(products);
            } else {
                const products = await prisma.products.findMany({
                    where: { count_in_stock: 0 },
                });
                res.json(products);
            }
        }
    } catch (err) {
        console.log(err);
        res.status(403).json({ err: "Error occured." });
    }
}

export default isAuth(isAdmin(handler));
