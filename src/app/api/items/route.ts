import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { fetchItems } from "@/database/utils/fetchItems";

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

    // Step 4: Connect to the database and fetch items
    const client = await connect();

    try {
        const items = await fetchItems(client);
        console.log("items: ", items); // { rows } forse giusto in questo caso?

        /*
        if (!items || items.length === 0) {
            return NextResponse.json(
                { message: "Nessun articolo trovato." },
                { status: 404 }
            );
        }
        */

        return NextResponse.json({ items: items }, { status: 200 });
    } catch (error) {
        console.error("Errore API items:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
