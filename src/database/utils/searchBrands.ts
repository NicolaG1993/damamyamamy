import { PoolClient } from "pg";
import { getBrandsBySearch } from "../queries/brand";
import { mapRawBrandToBrand } from "./maps/mapRawBrandToBrand";

export async function searchBrands(client: PoolClient, search: string) {
    try {
        const res = await getBrandsBySearch(client, search);

        // if (!res.rows || res.rows.length === 0) {
        //     throw new Error(`No brands found for search term: ${search}`);
        // }

        return res.rows.map(mapRawBrandToBrand);
    } catch (error) {
        console.error("Error searching brands:", error);
        throw error;
    }
}
