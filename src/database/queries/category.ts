import { PoolClient, QueryResult } from "pg";
import { RawCategory } from "@/types/item";

export const newCategory = async (
    client: PoolClient,
    name: string
): Promise<QueryResult<RawCategory>> => {
    const myQuery = `
        INSERT INTO categories (name)
        VALUES ($1)
        RETURNING *;
    `;
    const keys = [name];
    return client.query(myQuery, keys);
};

export const getCategoriesBySearch = async (
    client: PoolClient,
    search: string
): Promise<QueryResult<RawCategory>> => {
    const query = `
        SELECT id, name
        FROM categories
        WHERE name ILIKE $1
        LIMIT 10;
    `;
    const values = [`%${search}%`];
    return client.query(query, values);
};
