import { ShopItem } from "@/types/shop";
import { PoolClient } from "pg";
import { getShopItem } from "@/database/queries/shop";
import { mapRawShopItemToShopItem } from "@/database/utils/maps/mapRawShopItemToShopItem";

export async function fetchShopItem(
    client: PoolClient,
    itemSlug: string
): Promise<ShopItem> {
    try {
        const res = await getShopItem(client, itemSlug);

        if (!res.rows || res.rows.length === 0) {
            throw new Error(`Item with slug = ${itemSlug} not found`);
        }

        const mappedItem = mapRawShopItemToShopItem(res.rows[0]);

        return mappedItem;
    } catch (error) {
        console.error("Error fetching item:", error);
        throw error;
    }
}
