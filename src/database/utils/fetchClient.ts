import { PoolClient } from "pg";
import { getClientById, getClientFormData } from "@/database/queries/client";
import {
    mapRawClientFormData,
    mapRawClientToClient,
} from "./maps/mapRawClientToClient";
import { Client, ClientFormData } from "@/types/client";

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

export async function fetchClientFormData(
    client: PoolClient,
    clientId: number
): Promise<ClientFormData> {
    try {
        const res = await getClientFormData(client, clientId);

        if (!res.rows || res.rows.length === 0) {
            throw new Error(`Client with ID ${clientId} not found`);
        }

        return mapRawClientFormData(res.rows[0]);
    } catch (error) {
        console.error("Error fetching client:", error);
        throw error;
    }
}
