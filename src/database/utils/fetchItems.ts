import { PoolClient } from "pg";
import { getItems } from "@/database/queries/item";
import { mapRawItemsToItems } from "./maps/mapRawItemToItem";

export async function fetchItems(client: PoolClient) {
    try {
        const res = await getItems(client);
        const mappedItems = mapRawItemsToItems(res.rows);
        return mappedItems;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
}
