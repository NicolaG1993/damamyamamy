import { PoolClient } from "pg";
import { getItemById } from "@/database/queries/item";
import { mapRawItemToItemFormData } from "./maps/mapRawItemToItem";
import { ItemFormData } from "@/types/item";

export async function fetchItem(
    client: PoolClient,
    itemId: number
): Promise<ItemFormData> {
    try {
        const res = await getItemById(client, itemId);

        if (!res.rows || res.rows.length === 0) {
            throw new Error(`Item with ID ${itemId} not found`);
        }

        return mapRawItemToItemFormData(res.rows[0]);
    } catch (error) {
        console.error("Error fetching item:", error);
        throw error;
    }
}
