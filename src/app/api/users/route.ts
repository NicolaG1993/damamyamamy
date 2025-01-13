import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { fetchUsers } from "@/database/utils/fetchUsers";

export async function GET(req: NextRequest) {
    const authToken = req.cookies.get("damamyamamy_auth_token")?.value;

    if (!authToken) {
        return NextResponse.json(
            { message: "Accesso API non autorizzato. Token mancante." },
            { status: 401 }
        );
    }

    // const { middlewareVerifyToken } = await import("@/utils/jwtUtils");
    const tokenPayload = await middlewareVerifyToken(authToken);

    if (!tokenPayload) {
        return NextResponse.json(
            {
                message:
                    "Token non valido o scaduto. Eseguire nuovamente il login.",
            },
            { status: 403 }
        );
    }

    // Step 3: Check for admin privileges (if required)
    if (!tokenPayload.isAdmin) {
        return NextResponse.json(
            { message: "Accesso negato. Non hai i permessi necessari." },
            { status: 403 }
        );
    }

    // Step 4: Connect to the database and fetch users
    const client = await connect();

    try {
        const users = await fetchUsers(client);
        console.log("users: ", users); // { rows } forse giusto in questo caso?

        if (!users || users.length === 0) {
            return NextResponse.json(
                { message: "Nessun utente trovato." },
                { status: 404 }
            );
        }

        return NextResponse.json({ users: users }, { status: 200 });
    } catch (error) {
        console.error("Errore API users:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
