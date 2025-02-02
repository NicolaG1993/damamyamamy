import {
    ShopFiltersData,
    ShopItem,
    ShopPageFilters,
    ShopPageResponse,
} from "@/types/shop";
import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

export const getShopPage = async (
    filters: ShopPageFilters
): Promise<ShopPageResponse> => {
    try {
        const res = await axios.get("/api/shop/page", { params: filters });

        if (res.status === 200) {
            return {
                items: res.data.items, // Fixed key to match API response
                total: res.data.total, // Added total count
            };
        } else {
            console.error("Unexpected response:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};

export const getShopFilters = async (): Promise<ShopFiltersData> => {
    try {
        const res = await axios.get("/api/shop/filters");

        if (res.status === 200) {
            return {
                brands: res.data.brands,
                categories: res.data.categories,
            };
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};

export const getShopItem = async (slug: string): Promise<ShopItem> => {
    try {
        const res = await axios.get(`/api/shop/item/${slug}`);

        if (res.status === 200) {
            return res.data.item;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};
