import { PoolClient } from "pg";
import { getCategoriesBySearch } from "../queries/category";
import { mapRawCategoryToCategory } from "./maps/mapRawCategoryToCategory";

export async function searchCategories(client: PoolClient, search: string) {
    try {
        const res = await getCategoriesBySearch(client, search);

        // if (!res.rows || res.rows.length === 0) {
        //     throw new Error(`No categories found for search term: ${search}`);
        // }

        return res.rows.map(mapRawCategoryToCategory);
    } catch (error) {
        console.error("Error searching categories:", error);
        throw error;
    }
}
