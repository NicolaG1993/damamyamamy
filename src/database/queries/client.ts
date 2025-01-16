import { RawClient } from "@/types/client";
import { PoolClient, QueryResult } from "pg";

export const newClient = async (
    client: PoolClient,
    firstName: string,
    lastName: string,
    email: string,
    phone: string,
    code: string
): Promise<QueryResult<RawClient>> => {
    const myQuery = `
            INSERT INTO clients 
            (first_name, last_name, email, phone, personal_code) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
        `;
    const keys = [firstName, lastName, email, phone, code];
    return client.query(myQuery, keys);
};

// TODO: get related items 🧠👇
export const getClientById = async (
    client: PoolClient,
    clientId: number
): Promise<QueryResult<RawClient>> => {
    const myQuery = `
        SELECT id, first_name, last_name, email, phone, personal_code, created_at
        FROM clients
        WHERE id = $1
    `;
    const values = [clientId];
    return client.query(myQuery, values);
};

export const getClients = async (
    client: PoolClient
): Promise<QueryResult<RawClient>> => {
    const myQuery = `
        SELECT id, first_name, last_name, email, phone, personal_code, created_at
        FROM clients
    `;
    return client.query(myQuery);
};

export const updateClientById = async (
    client: PoolClient,
    clientId: number,
    data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        phone?: string;
        code?: string;
    }
) => {
    const myQuery = `
        UPDATE clients
        SET 
            first_name = COALESCE($1, first_name),
            last_name = COALESCE($2, last_name),
            email = COALESCE($3, email),
            phone = COALESCE($4, phone),
            code = COALESCE($4, code)
        WHERE id = $5
    `;
    const values = [
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.code,
        clientId,
    ];
    return client.query(myQuery, values);
};
