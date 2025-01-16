import { NextRequest, NextResponse } from "next/server";
import { addClient } from "@/database/utils/addClient";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";

export async function POST(req: NextRequest) {
    console.log("🔥 add client API invoked! 🔥");

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

    // Step 4: Process the request if the client is authorized
    if (req.method !== "POST") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }

    const body = await req.json();
    const { firstName, lastName, email, phone, code } = body;

    if (!firstName || !lastName || !code) {
        return NextResponse.json(
            { message: "Mancano delle informazioni" },
            { status: 400 }
        );
    }

    const client = await connect();

    try {
        const clientId = await addClient(client, {
            firstName,
            lastName,
            email,
            phone,
            code,
        });

        if (!clientId) {
            return NextResponse.json(
                { message: "Non è stato possibile creare il cliente" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Cliente creato con successo!", clientId },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
