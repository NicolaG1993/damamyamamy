import { OptionResponse } from "@/types/form";
import { handleAxiosError } from "@/utils/axiosUtils";
import { searchCategory } from "./category";
import { searchBrand } from "./brand";

export const getInputOptions = async (
    term: string,
    label: string
): Promise<OptionResponse> => {
    try {
        let res;
        if (label === "Brand") {
            // res = await axios.get<Option[]>(`/api/brands?search=${term}`);
            res = await searchBrand(term);
        } else if (label === "Brand") {
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

        return { options: res };
    } catch (err) {
        throw new Error(handleAxiosError(err));
    }
};
