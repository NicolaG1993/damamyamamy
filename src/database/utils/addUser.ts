import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import bcrypt from "bcryptjs";
import { newUser } from "@/database/queries/user";

export async function addUser(
    client: PoolClient,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    isAdmin: boolean = false
): Promise<number | null> {
    try {
        await begin(client);

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
        return null;
    }
}
