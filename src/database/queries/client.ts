import { ClientFormData, RawClient, RawClientFormData } from "@/types/client";
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

export const getClientFormData = async (
    client: PoolClient,
    clientId: number
): Promise<QueryResult<RawClientFormData>> => {
    const myQuery = `
            SELECT first_name, last_name, email, phone, personal_code 
            FROM clients 
            WHERE id = $1
        `;
    const keys = [clientId];
    return client.query(myQuery, keys);
};

// TODO: get related items 🧠👇
export const getClientById = async (
    client: PoolClient,
    clientId: number
): Promise<QueryResult<RawClient>> => {
    const myQuery = `
        WITH item_pics AS (
            SELECT DISTINCT ON (ip.item_id) 
                ip.item_id, 
                ip.picture_url AS pic
            FROM item_pictures ip
            ORDER BY ip.item_id, ip.id ASC
        )
        SELECT 
            c.id,
            c.first_name,
            c.last_name,
            c.email,
            c.phone,
            c.personal_code,
            c.created_at,
            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', i.id,
                        'name', i.name,
                        'price', i.price,
                        'sold_at', i.sold_at,
                        'pic', ip.pic
                    )
                ) FILTER (WHERE i.id IS NOT NULL), 
                '[]'
            ) AS items
        FROM clients c
        LEFT JOIN item_client ic ON c.id = ic.client_id
        LEFT JOIN items i ON ic.item_id = i.id
        LEFT JOIN item_pics ip ON i.id = ip.item_id
        WHERE c.id = $1
        GROUP BY c.id
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

export const getClientsAsOptions = async (
    client: PoolClient
): Promise<QueryResult<RawClient>> => {
    const myQuery = `
        SELECT id, first_name, last_name
        FROM clients
        ORDER BY last_name, first_name
    `;
    return client.query(myQuery);
};

export const updateClientById = async (
    client: PoolClient,
    clientId: number,
    data: ClientFormData
): Promise<QueryResult> => {
    const myQuery = `
        UPDATE clients
        SET 
            first_name = COALESCE($1, first_name),
            last_name = COALESCE($2, last_name),
            email = COALESCE($3, email),
            phone = COALESCE($4, phone),
            personal_code = COALESCE($5, personal_code)
        WHERE id = $6
    `;
    const keys = [
        data.firstName,
        data.lastName,
        data.email,
        data.phone,
        data.code,
        clientId,
    ];
    return client.query(myQuery, keys);
};
