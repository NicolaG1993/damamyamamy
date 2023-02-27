import { isAdmin, isAuth } from "@/utils/auth";
import { newItem, newRelations } from "@/utils/db/db";
async function handler(req, res) {
    try {
        let {
            title,
            pics,
            price,
            count_in_stock,
            conditions,
            info,
            description,
            categories,
            tags,
            brands,
        } = req.body;

        if (!title) {
            return res.status(422).send({ error: ["Manca il titolo"] });
        }

        // CREATE ITEM
        let { rows } = await newItem(
            title,
            pics,
            price,
            count_in_stock,
            conditions,
            info,
            description
        );
        // ADD RELATIONS
        categories &&
            categories.length &&
            (await newRelations(
                rows[0].id,
                categories,
                "item_category",
                "item_id",
                "category_id"
            ));
        tags &&
            tags.length &&
            (await newRelations(
                rows[0].id,
                tags,
                "item_tag",
                "item_id",
                "tag_id"
            ));
        brands &&
            brands.length &&
            (await newRelations(
                rows[0].id,
                brands,
                "item_brand",
                "item_id",
                "brand_id"
            ));

        res.status(200).json(rows[0]);
    } catch (err) {
        console.log("🐞 ERROR: ", err);
        res.status(500).json({ err: "Error occured." });
    }
}
export default isAuth(isAdmin(handler));
