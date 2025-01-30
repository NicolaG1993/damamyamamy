import {
    RawClient,
    Client,
    RawClientPreview,
    ClientPreview,
    RawClientFormData,
    ClientFormData,
} from "@/types/client";
import { mapRawItemPreviewToItemPreview } from "./mapRawItemToItem";

export const mapRawClientToClient = (rawClient: RawClient): Client => {
    return {
        id: rawClient.id,
        firstName: rawClient.first_name,
        lastName: rawClient.last_name,
        email: rawClient.email,
        phone: rawClient.phone,
        code: rawClient.personal_code,
        items: mapRawItemPreviewToItemPreview(rawClient.items), // 🧠 TODO: use mapRawItemsToItems
        createdAt: rawClient.created_at.toISOString(),
    };
};

export const mapRawClientPreviewToClientPreview = (
    rawClient: RawClientPreview
): ClientPreview => {
    return {
        id: rawClient.id,
        name: rawClient.name,
    };
};

export const mapRawClientFormData = (
    rawClient: RawClientFormData
): ClientFormData => {
    return {
        firstName: rawClient.first_name,
        lastName: rawClient.last_name,
        email: rawClient.email,
        phone: rawClient.phone,
        code: rawClient.personal_code,
    };
};
