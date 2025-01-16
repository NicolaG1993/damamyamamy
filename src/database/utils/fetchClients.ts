import { PoolClient } from "pg";
import { getClients } from "@/database/queries/client";
import { mapRawClientsToClients } from "./maps/mapRawClientsToClients";

export async function fetchClients(client: PoolClient) {
    try {
        const res = await getClients(client);
        const mappedClients = mapRawClientsToClients(res.rows);
        return mappedClients;
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
}
