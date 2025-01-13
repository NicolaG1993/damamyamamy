import { RawUser } from "@/types/user";
import { PoolClient, QueryResult } from "pg";

const newUser = async (
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

const getUser = async (
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

const getUsers = async (client: PoolClient): Promise<QueryResult<RawUser>> => {
    const myQuery = `
        SELECT id, first_name, last_name, email, is_admin, created_at
        FROM users
    `;
    return client.query(myQuery);
};

export { newUser, getUser, getUsers };
