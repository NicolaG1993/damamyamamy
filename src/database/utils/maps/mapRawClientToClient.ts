import { RawClient, Client } from "@/types/client";

export const mapRawClientToClient = (rawClient: RawClient): Client => {
    return {
        id: rawClient.id,
        firstName: rawClient.first_name,
        lastName: rawClient.last_name,
        email: rawClient.email,
        phone: rawClient.phone,
        code: rawClient.personal_code,
        // items: rawClient.items.map((item) => ({ name: item.name })), // 🧠 TODO: use mapRawItemsToItems
        createdAt: rawClient.created_at.toISOString(),
    };
};
