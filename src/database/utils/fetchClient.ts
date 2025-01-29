import { PoolClient } from "pg";
import { getClientById } from "@/database/queries/client";
import { mapRawClientToClient } from "./maps/mapRawClientToClient";
import { Client } from "@/types/client";

export async function fetchClient(
    client: PoolClient,
    clientId: number
): Promise<Client> {
    try {
        const res = await getClientById(client, clientId);

        if (!res.rows || res.rows.length === 0) {
            throw new Error(`Client with ID ${clientId} not found`);
        }

        return mapRawClientToClient(res.rows[0]);
    } catch (error) {
        console.error("Error fetching client:", error);
        throw error;
    }
}
