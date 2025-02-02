import { PoolClient } from "pg";
import { getShopItems, getTotalShopItemsCount } from "@/database/queries/shop";
import { mapRawShopPageToShopPage } from "./maps/mapRawShopPageToShopPage";
import { ShopPageFilters } from "@/types/shop";

export async function fetchShopItems(
    client: PoolClient,
    filters: ShopPageFilters
) {
    try {
        const res = await getShopItems(client, filters);
        const mappedShopPage = mapRawShopPageToShopPage(res.rows);

        const totalCountRes = await getTotalShopItemsCount(client, filters);
        const total = totalCountRes.rows[0]?.count || 0;

        return {
            items: mappedShopPage,
            total,
        };
    } catch (error) {
        console.error("Error fetching item:", error);
        throw error;
    }
}
