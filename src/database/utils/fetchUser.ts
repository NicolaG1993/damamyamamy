import { PoolClient } from "pg";
import { getUserById } from "@/database/queries/user";
import { mapRawUserToUser } from "./maps/mapRawUserToUser";

export async function fetchUser(client: PoolClient, userId: number) {
    console.log("fetchUser: ", userId);
    try {
        const res = await getUserById(client, userId);

        if (!res.rows || res.rows.length === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }

        return mapRawUserToUser(res.rows[0]);
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}
