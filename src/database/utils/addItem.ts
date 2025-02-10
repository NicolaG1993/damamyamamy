import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import {
    linkItemToBrand,
    linkItemToCategories,
    linkItemToClient,
    linkItemToPictures,
    newItem,
} from "@/database/queries/item";
import { ItemFormData } from "@/types/item";
import { getBrandsBySearch, newBrand } from "../queries/brand";
import { getCategoriesBySearch, newCategory } from "../queries/category";
import { supabase } from "@/utils/supabaseUtils";
import { sanitizeFileName, sanitizeName } from "@/utils/slug";

export async function addItem(
    client: PoolClient,
    itemData: ItemFormData
): Promise<{ itemId: number; itemSlug: string }> {
    try {
        await begin(client);

        const {
            name,
            price,
            stock,
            slug,
            description,
            condition,
            brand,
            owner,
            categories,
            pics,
        } = itemData;

        // Step 1: Check for existing brand or add a new one
        let brandId;
        if (brand) {
            const existingBrand = await getBrandsBySearch(client, brand.name);
            brandId = existingBrand.rows[0]?.id;

            if (!brandId) {
                const brandResult = await newBrand(client, brand.name);
                brandId = brandResult.rows[0]?.id;

                if (!brandId) {
                    throw new Error("Errore durante l'inserimento del brand.");
                }
            }
        }

        // Step 2: Check for existing categories or add new ones
        const categoryIds: number[] = [];
        if (!!categories.length) {
            for (const category of categories) {
                const existingCategory = await getCategoriesBySearch(
                    client,
                    category.name
                );
                if (existingCategory) {
                    categoryIds.push(existingCategory.rows[0].id);
                } else {
                    const categoryResult = await newCategory(
                        client,
                        category.name
                    );
                    const categoryId = categoryResult.rows[0]?.id;

                    if (!categoryId) {
                        throw new Error(
                            "Errore durante l'inserimento della categoria."
                        );
                    }

                    categoryIds.push(categoryId);
                }
            }
        }

        // Step 3: Upload pictures to Supabase bucket
        const bucketName = "item-pictures";
        const uploadedPictureUrls: string[] = [];
        const safeItemName = sanitizeName(name);

        for (const picture of pics) {
            const safeFileName = sanitizeFileName(picture.name);
            const fileName = `${safeItemName}-${Date.now()}-${safeFileName}`;
            const { error } = await supabase.storage
                .from(bucketName)
                .upload(fileName, picture);
            //    .upload(fileName, fs.createReadStream(picture.filepath));

            if (error) {
                throw new Error(`Errore caricamento immagine: ${picture.name}`);
            }

            const publicUrl = supabase.storage
                .from(bucketName)
                .getPublicUrl(fileName).data?.publicUrl;

            if (!publicUrl) {
                throw new Error(
                    `Impossibile ottenere URL pubblico per: ${fileName}`
                );
            }

            uploadedPictureUrls.push(publicUrl);
        }

        // Step 4: Save item and relations (categories, owner, brand and picture URLs) to the database
        const itemResult = await newItem(
            client,
            name,
            price,
            stock,
            slug,
            description,
            condition
        );

        if (
            !itemResult.rows ||
            itemResult.rows.length === 0 ||
            !itemResult.rows[0]?.id
        ) {
            throw new Error("Errore durante l'inserimento dell'articolo");
        } else {
            const itemId = itemResult.rows[0].id;
            const itemSlug = itemResult.rows[0].slug;

            if (brandId) {
                await linkItemToBrand(client, itemId, brandId);
            }

            await linkItemToClient(client, itemId, owner.id);

            await linkItemToCategories(client, itemId, categoryIds);

            await linkItemToPictures(client, itemId, uploadedPictureUrls);

            await commit(client);

            return { itemId, itemSlug };
        }
    } catch (error) {
        await rollback(client);
        console.error("Error inserting item:", error);
        throw error; // throw new Error("Item insertion failed: " + error.message);
    }
}
