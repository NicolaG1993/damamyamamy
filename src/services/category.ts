import { Category, SearchCategoryResponse } from "@/types/item";
import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

export const getCategory = async (categoryId: number): Promise<Category> => {
    try {
        const res = await axios.get(`/api/categories/${categoryId}`);

        if (res.status === 200) {
            return res.data.category;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};

export const searchCategory = async (term: string): Promise<Category[]> => {
    try {
        const res = await axios.get<SearchCategoryResponse>(
            `/api/categories?search=${term}`
        );

        if (res.status === 200) {
            return res.data.categories;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};

export const getCategories = async (): Promise<Category[]> => {
    try {
        const res = await axios.get("/api/categories");

        if (res.status === 200) {
            return res.data.categories;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};
