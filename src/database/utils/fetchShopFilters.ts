import { PoolClient } from "pg";
import { getShopBrands, getShopCategories } from "@/database/queries/shop";

export async function fetchShopFilters(client: PoolClient) {
    try {
        const brandsRes = await getShopBrands(client);
        const categoriesRes = await getShopCategories(client);
        // const mappedShopPage = mapRawShopPageToShopPage(res.rows);

        return {
            brands: brandsRes.rows.map(({ name }) => name),
            categories: categoriesRes.rows.map(({ name }) => name),
        };
    } catch (error) {
        console.error("Error fetching item:", error);
        throw error;
    }
}
