import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import { newBrand } from "@/database/queries/brand";
import { RawBrand } from "@/types/item";

export async function addBrand(
    client: PoolClient,
    name: string
): Promise<RawBrand | null> {
    try {
        await begin(client);

        const res = await newBrand(client, name);

        if (!res.rows || res.rows.length === 0) {
            throw new Error("Failed to insert brand");
        }

        await commit(client);

        return res.rows[0];
    } catch (error) {
        await rollback(client);
        console.error("Error inserting client:", error);
        throw error; // throw new Error("Client insertion failed: " + error.message);
    }
}
