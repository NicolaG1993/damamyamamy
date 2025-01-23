import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import { updateClientById } from "@/database/queries/client";
import { ClientFormData } from "@/types/client";

export async function updateClient(
    client: PoolClient,
    clientId: number,
    clientData: ClientFormData
    // clientData: Partial<Client>
): Promise<boolean> {
    try {
        await begin(client);

        const res = await updateClientById(client, clientId, clientData);

        if (!res.rowCount) {
            throw new Error(`Failed to update client with ID ${clientId}`);
        }

        await commit(client);
        return true;
    } catch (error) {
        await rollback(client);
        console.error("Error updating client:", error);
        throw error;
    }
}
