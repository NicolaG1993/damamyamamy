import { PoolClient } from "pg";
import { getUserById, getUserFormData } from "@/database/queries/user";
import { mapRawUserToUser, mapRawUserFormData } from "./maps/mapRawUserToUser";
import { User, UserFormData } from "@/types/user";

export async function fetchUser(
    client: PoolClient,
    userId: number
): Promise<User> {
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

export async function fetchUserFormData(
    client: PoolClient,
    userId: number
): Promise<UserFormData> {
    try {
        const res = await getUserFormData(client, userId);

        if (!res.rows || res.rows.length === 0) {
            throw new Error(`User with ID ${userId} not found`);
        }

        return mapRawUserFormData(res.rows[0]);
    } catch (error) {
        console.error("Error fetching user:", error);
        throw error;
    }
}
