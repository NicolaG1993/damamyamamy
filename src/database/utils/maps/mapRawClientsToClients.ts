import { RawClient, Client } from "@/types/client";

export const mapRawClientsToClients = (rawClients: RawClient[]): Client[] => {
    return rawClients.map((client) => ({
        id: client.id,
        firstName: client.first_name,
        lastName: client.last_name,
        email: client.email,
        phone: client.phone,
        code: client.personal_code,
        createdAt: client.created_at.toISOString(),
    }));
};
