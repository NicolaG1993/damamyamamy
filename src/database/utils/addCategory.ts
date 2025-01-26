import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import { newCategory } from "@/database/queries/category";
import { RawCategory } from "@/types/item";

export async function addCategory(
    client: PoolClient,
    name: string
): Promise<RawCategory | null> {
    try {
        await begin(client);

        const res = await newCategory(client, name);

        if (!res.rows || res.rows.length === 0) {
            throw new Error("Failed to insert category");
        }

        await commit(client);

        return res.rows[0];
    } catch (error) {
        await rollback(client);
        console.error("Error inserting client:", error);
        throw error; // throw new Error("Client insertion failed: " + error.message);
    }
}
