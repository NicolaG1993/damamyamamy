import { isAdmin, isAuth } from "@/utils/auth";
import { newItem, newRelations } from "@/utils/db/db";
import { deleteDuplicateObjects } from "@/utils/parsers";
import slugify from "@/utils/slugify";

async function handler(req, res) {
    try {
        let {
            name,
            pics,
            price,
            count_in_stock,
            condition,
            info,
            description,
            categories,
            tags,
            brands,
        } = req.body;

        if (!name) {
            return res.status(422).send({ error: ["Manca il titolo"] });
        }
        if (!condition) {
            condition = "new";
        }

        let slug = slugify(name);

        console.log("req.body: ", { ...req.body, slug });

        // CREATE ITEM
        let { rows } = await newItem(
            name,
            pics,
            price,
            count_in_stock,
            condition,
            description,
            info,
            slug
        );
        // ADD RELATIONS
        categories &&
            categories.length &&
            (await newRelations(
                rows[0].id,
                deleteDuplicateObjects(categories),
                "item_category",
                "item_id",
                "category_id"
            ));
        tags &&
            tags.length &&
            (await newRelations(
                rows[0].id,
                deleteDuplicateObjects(tags),
                "item_tag",
                "item_id",
                "tag_id"
            ));
        brands &&
            brands.length &&
            (await newRelations(
                rows[0].id,
                deleteDuplicateObjects(brands),
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
