import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import { updateUserById } from "@/database/queries/user";
import { User } from "@/types/user";

export async function updateUser(
    client: PoolClient,
    userId: number,
    userData: Partial<User>
): Promise<boolean> {
    try {
        await begin(client);

        const res = await updateUserById(client, userId, userData);

        if (!res.rowCount) {
            throw new Error(`Failed to update user with ID ${userId}`);
        }

        await commit(client);
        return true;
    } catch (error) {
        await rollback(client);
        console.error("Error updating user:", error);
        throw error;
    }
}
