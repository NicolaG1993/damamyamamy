import { RawUser } from "@/types/user";
import { PoolClient, QueryResult } from "pg";

export const newUser = async (
    client: PoolClient,
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    isAdmin: boolean
): Promise<QueryResult<RawUser>> => {
    const myQuery = `
            INSERT INTO users 
            (first_name, last_name, email, psw, is_admin) 
            VALUES ($1, $2, $3, $4, $5) 
            RETURNING *
        `;
    const keys = [firstName, lastName, email, hashedPassword, isAdmin];
    return client.query(myQuery, keys);
};

export const getUser = async (
    client: PoolClient,
    email: string
): Promise<QueryResult<RawUser>> => {
    const myQuery = `
            SELECT id, first_name, last_name, email, psw AS hashed_password, is_admin 
            FROM users 
            WHERE email = $1
        `;
    const keys = [email];
    return client.query(myQuery, keys);
};

export const getUserById = async (
    client: PoolClient,
    userId: number
): Promise<QueryResult<RawUser>> => {
    const myQuery = `
        SELECT id, first_name, last_name, email, is_admin, created_at
        FROM users
        WHERE id = $1
    `;
    const keys = [userId];
    return client.query(myQuery, keys);
};

export const getUsers = async (
    client: PoolClient
): Promise<QueryResult<RawUser>> => {
    const myQuery = `
        SELECT id, first_name, last_name, email, is_admin, created_at
        FROM users
    `;
    return client.query(myQuery);
};

export const updateUserById = async (
    client: PoolClient,
    userId: number,
    data: {
        firstName?: string;
        lastName?: string;
        email?: string;
        isAdmin?: boolean;
    }
) => {
    const myQuery = `
        UPDATE users
        SET 
            first_name = COALESCE($1, first_name),
            last_name = COALESCE($2, last_name),
            email = COALESCE($3, email),
            is_admin = COALESCE($4, is_admin)
        WHERE id = $5
    `;
    const keys = [
        data.firstName,
        data.lastName,
        data.email,
        data.isAdmin,
        userId,
    ];
    return client.query(myQuery, keys);
};
