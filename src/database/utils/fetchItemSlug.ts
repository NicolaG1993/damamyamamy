import { PoolClient } from "pg";
import { getItemSlug } from "@/database/queries/item";

export async function fetchItemSlug(client: PoolClient, slug: string) {
    try {
        const res = await getItemSlug(client, slug);

        const isUnique = !res.rows[0].exists;

        return isUnique;
    } catch (error) {
        console.error("Error fetching item:", error);
        throw error;
    }
}
