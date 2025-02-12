import { begin, commit, rollback } from "@/database/db";
import { PoolClient } from "pg";
import bcrypt from "bcryptjs";
import { getUser } from "@/database/queries/user";
import { signToken } from "@/utils/jwtUtils";

interface User {
    firstName: string;
    lastName: string;
    isAdmin: boolean;
    email: string;
    token: string;
} // todo: move

export async function fetchUserLogin(
    client: PoolClient,
    email: string,
    password: string
): Promise<User | null> {
    try {
        await begin(client);

        const res = await getUser(client, email);

        if (!res.rows || res.rows.length === 0) {
            throw new Error("Failed to fetch user");
        }

        await commit(client);

        const user = res.rows[0];

        // Compare passwords
        const passwordMatch = await bcrypt.compare(
            password,
            user.hashed_password || ""
        );

        if (!passwordMatch) {
            throw new Error(
                "I dati di accesso che hai fornito non sono validi"
            );
        }

        // Generate JWT
        const token = signToken({
            id: user.id,
            email: user.email,
            isAdmin: user.is_admin,
        });

        return {
            firstName: user.first_name,
            lastName: user.last_name,
            isAdmin: user.is_admin,
            email: user.email,
            token: token || "",
        };
    } catch (error) {
        await rollback(client);
        console.error("Error fetching user:", error);
        throw error;
        // return null;
    }
}
