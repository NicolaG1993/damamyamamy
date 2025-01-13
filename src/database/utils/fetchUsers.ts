import { PoolClient } from "pg";
import { getUsers } from "@/database/queries/user";
import { mapRawUsersToUsers } from "./maps/mapRawUsersToUsers";

export async function fetchUsers(client: PoolClient) {
    try {
        const res = await getUsers(client);
        const mappedUsers = mapRawUsersToUsers(res.rows);
        return mappedUsers;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw error;
    }
}
