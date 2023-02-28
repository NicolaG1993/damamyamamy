import { isAdmin, isAuth } from "@/utils/auth";
import { editItem, newRelations, deleteRelations } from "@/utils/db/db";
import { deleteDuplicateValues } from "@/utils/parsers";
import slugify from "@/utils/slugify";

async function handler(req, res) {
    try {
        let {
            id,
            name,
            pics,
            price,
            count_in_stock,
            condition,
            info,
            description,
            // categories,
            // tags,
            // brands,
            addedRelations,
            removedRelations,
        } = req.body;

        if (!name) {
            return res.status(422).send({ error: ["Manca il titolo"] });
        }

        let slug = slugify(name);

        console.log("req.body: ", { ...req.body, slug });

        // CREATE ITEM
        let { rows } = await editItem(
            id,
            name,
            pics,
            price,
            count_in_stock,
            slug,
            description,
            info,
            condition
        );
        // ADD RELATIONS
        addedRelations.categories &&
            addedRelations.categories.length &&
            (await newRelations(
                rows[0].id,
                deleteDuplicateValues(addedRelations.categories),
                "item_category",
                "item_id",
                "category_id"
            ));
        addedRelations.tags &&
            addedRelations.tags.length &&
            (await newRelations(
                rows[0].id,
                deleteDuplicateValues(addedRelations.tags),
                "item_tag",
                "item_id",
                "tag_id"
            ));
        addedRelations.brands &&
            addedRelations.brands.length &&
            (await newRelations(
                rows[0].id,
                deleteDuplicateValues(addedRelations.brands),
                "item_brand",
                "item_id",
                "brand_id"
            ));
        //REMOVE RELATIONS
        removedRelations.categories &&
            removedRelations.categories.length &&
            (await deleteRelations(
                rows[0].id,
                deleteDuplicateValues(removedRelations.categories),
                "item_category",
                "item_id",
                "category_id"
            ));
        removedRelations.tags &&
            removedRelations.tags.length &&
            (await deleteRelations(
                rows[0].id,
                deleteDuplicateValues(removedRelations.tags),
                "item_tag",
                "item_id",
                "tag_id"
            ));
        removedRelations.brands &&
            removedRelations.brands.length &&
            (await deleteRelations(
                rows[0].id,
                deleteDuplicateValues(removedRelations.brands),
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
