import { CreateOptionResponse } from "@/types/form";
import { Brand, SearchBrandResponse } from "@/types/item";
import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

export const createBrand = async (
    name: string
): Promise<CreateOptionResponse> => {
    try {
        const res = await axios.post("/api/brands/add", { name });

        if (res.status === 201) {
            // Successful response

            return res.data.brand;
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

export const getBrand = async (brandId: number): Promise<Brand> => {
    try {
        const res = await axios.get(`/api/brands/${brandId}`);

        if (res.status === 200) {
            return res.data.brand;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};

export const searchBrand = async (term: string): Promise<Brand[]> => {
    try {
        const res = await axios.get<SearchBrandResponse>(
            `/api/brands?search=${term}`
        );

        if (res.status === 200) {
            return res.data.brands;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};

export const getBrands = async (): Promise<Brand[]> => {
    try {
        const res = await axios.get("/api/brands");

        if (res.status === 200) {
            return res.data.brands;
        } else {
            console.error("Unexpected status code:", res.data);
            throw new Error(res.data.message || "Errore sconosciuto.");
        }
    } catch (err) {
        throw new Error(handleAxiosError(err as Error));
    }
};
