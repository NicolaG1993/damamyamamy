import { PoolClient } from "pg";
import { getSoldItems } from "@/database/queries/item";
import { mapRawItemsToItems } from "./maps/mapRawItemToItem";

export async function fetchSoldItems(client: PoolClient) {
    try {
        const res = await getSoldItems(client);
        const mappedItems = mapRawItemsToItems(res.rows);
        return mappedItems;
    } catch (error) {
        console.error("Error fetching items:", error);
        throw error;
    }
}
