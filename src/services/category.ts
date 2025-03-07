import { CreateOptionResponse } from "@/types/form";
import { Category, SearchCategoryResponse } from "@/types/item";
import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

export const createCategory = async (
    name: string
): Promise<CreateOptionResponse> => {
    try {
        const res = await axios.post("/api/categories/add", { name });

        if (res.status === 201) {
            // Successful response
            return res.data.category;
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
        throw new Error(handleAxiosError(err as Error));
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
        throw new Error(handleAxiosError(err as Error));
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
        throw new Error(handleAxiosError(err as Error));
    }
};
