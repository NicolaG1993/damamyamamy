import { PoolClient, QueryResult } from "pg";
import { RawBrand } from "@/types/item";

export const newBrand = async (
    client: PoolClient,
    name: string
): Promise<QueryResult<RawBrand>> => {
    const myQuery = `
        INSERT INTO brands (name)
        VALUES ($1)
        RETURNING *;
    `;
    const keys = [name];
    return client.query(myQuery, keys);
};

export const getBrandsBySearch = async (
    client: PoolClient,
    search: string
): Promise<QueryResult<RawBrand>> => {
    const query = `
        SELECT id, name
        FROM brands
        WHERE name ILIKE $1
        LIMIT 10;
    `;
    const values = [`%${search}%`];
    return client.query(query, values);
};
