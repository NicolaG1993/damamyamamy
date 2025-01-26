import { CreateOptionResponse, Option } from "@/types/form";
import { handleAxiosError } from "@/utils/axiosUtils";
import { createCategory, searchCategory } from "./category";
import { createBrand, searchBrand } from "./brand";

export const createOption = async (
    name: string,
    label: string
): Promise<Option | CreateOptionResponse> => {
    try {
        let res;

        if (label === "Brand") {
            res = await createBrand(name);
        } else if (label === "Category") {
            res = await createCategory(name);
        } else {
            throw new Error("Label mancante.");
        }

        return res;
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};

export const getInputOptions = async (
    term: string,
    label: string
): Promise<Option[]> => {
    try {
        let res;
        if (label === "Brand") {
            // res = await axios.get<Option[]>(`/api/brands?search=${term}`);
            res = await searchBrand(term);
        } else if (label === "Category") {
            // res = await axios.get<Option[]>(`/api/categories?search=${term}`);
            res = await searchCategory(term);
        } else {
            throw new Error("Label mancante.");
        }
        // const res = await axios.get("/api/users");

        // if (res.status === 200) {
        //     return res.data.options;
        // } else {
        //     console.error("Unexpected status code:", res.data);
        //     throw new Error(res.data.message || "Errore sconosciuto.");
        // }

        return res;
        // return { options: res };
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};
