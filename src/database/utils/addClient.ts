import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import { newClient } from "@/database/queries/client";
import { ClientFormData } from "@/types/client";

export async function addClient(
    client: PoolClient,
    clientData: ClientFormData
): Promise<number | null> {
    try {
        await begin(client);

        const { firstName, lastName, email, phone, code } = clientData;

        const res = await newClient(
            client,
            firstName,
            lastName,
            email || "",
            phone || "",
            code
        );

        if (!res.rows || res.rows.length === 0) {
            throw new Error("Failed to insert client");
        }

        await commit(client);

        return res.rows[0].id;
    } catch (error) {
        await rollback(client);
        console.error("Error inserting client:", error);
        throw error; // throw new Error("Client insertion failed: " + error.message);
    }
}
