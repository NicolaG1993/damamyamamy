import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { fetchUser } from "@/database/utils/fetchUser";
import { updateUser } from "@/database/utils/updateUser";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ userId: number }> }
) {
    const { params } = context;
    const { userId } = await params;

    const authToken = req.cookies.get("damamyamamy_auth_token")?.value;

    if (!authToken) {
        return NextResponse.json(
            { message: "Accesso API non autorizzato. Token mancante." },
            { status: 401 }
        );
    }

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

    if (!tokenPayload.isAdmin) {
        return NextResponse.json(
            { message: "Accesso negato. Non hai i permessi necessari." },
            { status: 403 }
        );
    }

    const client = await connect();

    try {
        const user = await fetchUser(client, userId);

        if (!user) {
            return NextResponse.json(
                { message: "Utente non trovato." },
                { status: 404 }
            );
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Errore API fetchUser:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}

export async function PUT(
    req: NextRequest,
    { params }: { params: { userId: number } }
) {
    const authToken = req.cookies.get("damamyamamy_auth_token")?.value;

    if (!authToken) {
        return NextResponse.json(
            { message: "Accesso API non autorizzato. Token mancante." },
            { status: 401 }
        );
    }

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

    if (!tokenPayload.isAdmin) {
        return NextResponse.json(
            { message: "Accesso negato. Non hai i permessi necessari." },
            { status: 403 }
        );
    }

    const client = await connect();

    try {
        const body = await req.json();
        const success = await updateUser(client, params.userId, body);

        if (!success) {
            return NextResponse.json(
                { message: "Aggiornamento fallito. Utente non trovato." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Utente aggiornato con successo." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Errore API updateUser:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
