/*
POSTGRESQL VERSION
import { isAdmin, isAuth } from "../../../shared/utils/auth";
import { updateProduct } from "../../../shared/utils/db/db";

async function handler(req, res) {
    // const slug = req.query.slug;

    const {
        id,
        name,
        slug,
        categories,
        tags,
        images,
        price,
        brand,
        count_in_stock,
        description,
        infos,
        condition,
        related_products,
    } = req.body;
    // console.log("🐸req.body.id:", id);

    try {
        const product = await updateProduct(
            id,
            name,
            slug,
            categories,
            tags,
            JSON.stringify(images),
            price,
            brand,
            count_in_stock,
            description,
            infos,
            condition,
            related_products
        );
        console.log("🐸product:", product.rows[0]);
        res.send({
            message: "Prodotto aggiornato",
            product: product.rows[0],
        });
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

export default isAuth(isAdmin(handler)); //middleware
*/

import { isAdmin, isAuth } from "../../../shared/utils/auth";
import prisma from "../../../shared/libs/prisma";

async function handler(req, res) {
    const {
        id,
        name,
        slug,
        categories,
        tags,
        images,
        price,
        brand,
        count_in_stock,
        description,
        infos,
        condition,
        related_products,
    } = req.body;

    try {
        const product = await prisma.products.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                slug: slug,
                categories: categories,
                tags: tags,
                images: images,
                price: price,
                brand: brand,
                count_in_stock: count_in_stock,
                description: description,
                infos: infos,
                condition: condition,
                related_products: related_products,
            },
        });

        res.send({
            message: "Prodotto aggiornato",
            product: product,
        });
    } catch (err) {
        console.log("ERROR!", err);
        return res.status(500).json({ message: err.message });
    }
}

export default isAuth(isAdmin(handler)); //middleware
