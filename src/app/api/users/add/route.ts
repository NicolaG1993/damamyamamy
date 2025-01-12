import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/database/utils/addUser";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";

export async function POST(req: NextRequest) {
    console.log("🔥 add user API invoked! 🔥");

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

    // Step 4: Process the request if the user is authorized
    if (req.method !== "POST") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }

    const body = await req.json();
    const { firstName, lastName, email, password, isAdmin } = body;

    if (!firstName || !lastName || !email || !password) {
        return NextResponse.json(
            { message: "Mancano delle informazioni" },
            { status: 400 }
        );
    }

    const client = await connect();

    try {
        const userId = await addUser(
            client,
            firstName,
            lastName,
            email,
            password,
            isAdmin || false
        );

        if (!userId) {
            return NextResponse.json(
                { message: "Non è stato possibile creare l'utente" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Utente creato con successo!", userId },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
