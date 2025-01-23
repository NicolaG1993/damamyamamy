import { Brand, SearchBrandResponse } from "@/types/item";
import { handleAxiosError } from "@/utils/axiosUtils";
import axios from "axios";

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
        throw new Error(handleAxiosError(err));
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
        throw new Error(handleAxiosError(err));
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
        throw new Error(handleAxiosError(err));
    }
};
