import {
    ItemFormData,
    CreateItemResponse,
    Item,
    ItemsTableRow,
} from "@/types/item";
import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

export const createItem = async (
    formData: FormData
): Promise<CreateItemResponse> => {
    try {
        const res = await axios.post("/api/items/add", formData);

        if (res.status === 201) {
            // Successful response

            return res.data;
        } else {
            // Handle unexpected status codes
            console.error("Unexpected error:", res.data);
            return { message: `Errore: ${res.data.message}` };
        }
    } catch (err) {
        // Use the error utility to handle the Axios error and pass a custom message
        const errorMessage = handleAxiosError(err as Error);
        return { message: errorMessage };
    }
};

export const editItem = async (
    itemId: number,
    updatedData: FormData
): Promise<CreateItemResponse> => {
    try {
        const res = await axios.put(`/api/items/${itemId}`, updatedData);

        if (res.status === 200) {
            return res.data;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};

export const getItemToEdit = async (itemId: number): Promise<ItemFormData> => {
    try {
        const res = await axios.get(`/api/items/${itemId}/form-data`);

        if (res.status === 200) {
            return res.data.item;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};

export const getItem = async (itemId: number): Promise<Item> => {
    try {
        const res = await axios.get(`/api/items/${itemId}`);

        if (res.status === 200) {
            return res.data.item;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};

export const getItems = async (): Promise<ItemsTableRow[]> => {
    try {
        const res = await axios.get("/api/items");

        if (res.status === 200) {
            return res.data.items;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};

export const getSoldItems = async (): Promise<ItemsTableRow[]> => {
    try {
        const res = await axios.get("/api/items/sold");

        if (res.status === 200) {
            return res.data.items;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};

export const sellItem = async (itemId: number) => {
    try {
        const res = await axios.put(`/api/items/${itemId}/sell`, {
            params: { itemId },
        });

        if (res.status === 200) {
            return res.data;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};

export const unsellItem = async (itemId: number) => {
    try {
        const res = await axios.put(`/api/items/${itemId}/unsell`, {
            params: { itemId },
        });

        if (res.status === 200) {
            return res.data;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};

export const checkSlugUniqueness = async (slug: string) => {
    try {
        const response = await axios.get(`/api/items/check-slug`, {
            params: { slug },
        });
        return response.data.isUnique;
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};
