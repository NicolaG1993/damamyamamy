import { PoolClient } from "pg";
import { getClientsAsOptions } from "@/database/queries/client";
import { mapRawClientToOption } from "./maps/mapRawClientToOption";

export async function fetchClientsAsOptions(client: PoolClient) {
    try {
        const res = await getClientsAsOptions(client);
        const mappedClients = res.rows.map(mapRawClientToOption);
        return mappedClients;
    } catch (error) {
        console.error("Error fetching clients:", error);
        throw error;
    }
}
