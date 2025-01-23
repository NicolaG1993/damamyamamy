import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { fetchClients } from "@/database/utils/fetchClients";

export async function GET(req: NextRequest) {
    // Step 1: Retrieve the token from cookies
    const authToken = req.cookies.get("damamyamamy_auth_token")?.value;

    if (!authToken) {
        return NextResponse.json(
            { message: "Accesso API non autorizzato. Token mancante." },
            { status: 401 }
        );
    }

    // Step 2: Verify the token
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

    // Step 4: Connect to the database and fetch clients
    const poolClient = await connect();

    try {
        const clients = await fetchClients(poolClient);
        console.log("clients: ", clients); // { rows } forse giusto in questo caso?

        if (!clients || clients.length === 0) {
            return NextResponse.json(
                { message: "Nessun cliente trovato." },
                { status: 404 }
            );
        }

        return NextResponse.json({ clients: clients }, { status: 200 });
    } catch (error) {
        console.error("Errore API clients:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(poolClient);
    }
}
