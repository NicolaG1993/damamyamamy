import { PoolClient, QueryResult } from "pg";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    psw: string;
    is_admin: boolean;
}

const newUser = async (
    client: PoolClient,
    firstName: string,
    lastName: string,
    email: string,
    hashedPassword: string,
    isAdmin: boolean
): Promise<QueryResult<User>> => {
    const myQuery = `INSERT INTO users 
    (first_name, last_name, email, psw, is_admin) 
    VALUES ($1, $2, $3, $4, $5) 
    RETURNING *`;
    const keys = [firstName, lastName, email, hashedPassword, isAdmin];
    return client.query(myQuery, keys);
};

export { newUser };
