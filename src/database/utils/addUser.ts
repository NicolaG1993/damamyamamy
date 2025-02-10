import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import bcrypt from "bcryptjs";
import { newUser } from "@/database/queries/user";
import { UserFormData } from "@/types/user";

export async function addUser(
    client: PoolClient,
    userData: UserFormData
): Promise<number | null> {
    try {
        await begin(client);

        const { firstName, lastName, email, password, isAdmin } = userData;

        if (!password) {
            throw new Error("Password missing");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const res = await newUser(
            client,
            firstName,
            lastName,
            email,
            hashedPassword,
            isAdmin
        );

        if (!res.rows || res.rows.length === 0) {
            throw new Error("Failed to insert user");
        }

        await commit(client);

        return res.rows[0].id;
    } catch (error) {
        await rollback(client);
        console.error("Error inserting user:", error);
        throw error; // throw new Error("User insertion failed: " + error.message);
    }
}
