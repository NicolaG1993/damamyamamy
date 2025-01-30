import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import { ItemFormData } from "@/types/item";
import {
    getItemPictures,
    linkItemToBrand,
    linkItemToCategories,
    linkItemToClient,
    linkItemToPictures,
    unlinkItemFromBrand,
    unlinkItemFromCategories,
    unlinkItemFromClient,
    unlinkItemPicture,
    updateItemById,
} from "@/database/queries/item";
import { getBrandsBySearch, newBrand } from "@/database/queries/brand";
import {
    getCategoriesBySearch,
    newCategory,
} from "@/database/queries/category";
import { supabase } from "@/utils/supabaseUtils";

export async function updateItem(
    client: PoolClient,
    itemId: number,
    updatedData: ItemFormData // ItemFormDataToSend
): Promise<boolean> {
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
            // newPictures,
            // existingPictures,
            // picturesToDelete,
        } = updatedData;

        // Step 1: Update item details
        await updateItemById(client, itemId, {
            name,
            price,
            stock,
            slug,
            description,
            condition,
        });

        // Step 2: Update brand relation
        if (brand) {
            const existingBrand = await getBrandsBySearch(client, brand.name);
            const brandId = existingBrand.rows[0]?.id;

            // Unlink existing brand if necessary
            await unlinkItemFromBrand(client, itemId);

            // Link to new or existing brand
            if (brandId) {
                await linkItemToBrand(client, itemId, brandId);
            } else {
                const brandResult = await newBrand(client, brand.name);
                const newBrandId = brandResult.rows[0]?.id;
                if (newBrandId) {
                    await linkItemToBrand(client, itemId, newBrandId);
                }
            }
        } else {
            await unlinkItemFromBrand(client, itemId);
        }

        // Step 3: Update categories relations
        const categoryIds: number[] = [];
        for (const category of categories) {
            const existingCategory = await getCategoriesBySearch(
                client,
                category.name
            );
            if (existingCategory) {
                categoryIds.push(existingCategory.rows[0].id);
            } else {
                const categoryResult = await newCategory(client, category.name);
                const categoryId = categoryResult.rows[0]?.id;
                if (categoryId) categoryIds.push(categoryId);
            }
        }

        await unlinkItemFromCategories(client, itemId); // Unlink all categories first
        await linkItemToCategories(client, itemId, categoryIds); // Re-link updated categories

        // Step 4: Update pictures (upload new and delete unused)
        /*
        const bucketName = "item-pictures";

        const existingPicturesResult = await getItemPictures(client, itemId);
        const existingPictures = existingPicturesResult.rows.map(
            (row) => row.picture_url
        );

        // Identify pictures to remove (only handle `string` types)
        const picturesToRemove = existingPictures.filter(
            (existing) => !pics.includes(existing)
        );

        // Identify pictures to add (only handle `File` types here)
        const picturesToAdd = pics.filter(
            (newPicture) =>
                typeof newPicture !== "string" &&
                !existingPictures.includes((newPicture as File).name) // Assuming existingPictures are names/URLs
        );

        // Delete unused pictures from Supabase bucket and database
        for (const pictureUrl of picturesToRemove) {
            const { error } = await supabase.storage
                .from(bucketName)
                .remove([pictureUrl]);
            if (error) {
                throw new Error(
                    `Failed to delete image from bucket: ${pictureUrl}`
                );
            }
            await unlinkItemPicture(client, itemId, pictureUrl);
        }

        // Upload new pictures to Supabase bucket and database
        const uploadedPictureUrls: string[] = [];
        for (const picture of picturesToAdd) {
            if (typeof picture === "string") {
                // Skip or handle existing picture URLs
                continue;
            }

            // It's a File
            const fileName = `${name}-${Date.now()}-${picture.name}`;
            const { data, error } = await supabase.storage
                .from(bucketName)
                .upload(fileName, picture);

            if (error) {
                throw new Error(`Error uploading image: ${picture.name}`);
            }

            const publicUrl = supabase.storage
                .from(bucketName)
                .getPublicUrl(fileName).data?.publicUrl;

            if (!publicUrl) {
                throw new Error(`Unable to get public URL for: ${fileName}`);
            }

            uploadedPictureUrls.push(publicUrl);
        }

        await linkItemToPictures(client, itemId, uploadedPictureUrls);
        */

        const bucketName = "item-pictures";

        // Get existing pictures from the database
        const existingPicturesResult = await getItemPictures(client, itemId);
        const existingPictures = existingPicturesResult.rows.map(
            (row) => row.picture_url
        );

        // Identify pictures to delete (pictures that exist in the database but not in the new form data)
        const picturesToDelete = existingPictures.filter(
            (existing) => !pics.includes(existing)
        );

        // Identify new pictures (only handle `File` types)
        const newPictures = pics.filter(
            (newPicture) =>
                typeof newPicture !== "string" &&
                !existingPictures.includes((newPicture as File).name) // Assuming existingPictures are names/URLs
        );

        // Identify existing pictures that should remain
        const picturesToKeep = pics.filter(
            (newPicture) =>
                typeof newPicture === "string" &&
                existingPictures.includes(newPicture)
        );

        console.log("pictures 🔥: ", {
            picturesToDelete,
            newPictures,
            picturesToKeep,
        });

        // Delete unused pictures from Supabase bucket and database
        for (const pictureUrl of picturesToDelete) {
            // Ensure the URL is correctly formatted before removing
            // Remove "20%" and double slashes if present (supabase issue)
            const fileName =
                decodeURIComponent(pictureUrl)
                    .replace(/\/\//g, "/")
                    .split("/")
                    .pop() ?? ""; // Ensure fileName is never undefined

            const { error } = await supabase.storage
                .from(bucketName)
                .remove([fileName]);

            if (error) {
                throw new Error(
                    `Failed to delete image from bucket: ${fileName}`
                );
            }
            await unlinkItemPicture(client, itemId, pictureUrl);
        }

        // Upload new pictures to Supabase bucket and database
        const uploadedPictureUrls: string[] = [];
        for (const picture of newPictures) {
            if (typeof picture === "string") {
                // Skip or handle existing picture URLs
                continue;
            }

            // It's a File
            const fileName = `${name}-${Date.now()}-${picture.name}`;
            const { error } = await supabase.storage
                .from(bucketName)
                .upload(fileName, picture);

            if (error) {
                throw new Error(`Error uploading image: ${picture.name}`);
            }

            const publicUrl = supabase.storage
                .from(bucketName)
                .getPublicUrl(fileName).data?.publicUrl;

            if (!publicUrl) {
                throw new Error(`Unable to get public URL for: ${fileName}`);
            }

            uploadedPictureUrls.push(publicUrl);
        }

        // Link the new uploaded pictures to the database
        await linkItemToPictures(client, itemId, uploadedPictureUrls);

        // Step 5: Update client relation
        if (owner) {
            await unlinkItemFromClient(client, itemId); // Unlink existing client first
            await linkItemToClient(client, itemId, owner.id); // Link to the updated client
        }

        await commit(client);

        return true;
    } catch (error) {
        await rollback(client);
        console.error("Error updating item:", error);
        throw error;
    }
}
