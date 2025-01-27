import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { fetchItem } from "@/database/utils/fetchItem";
import { updateItem } from "@/database/utils/updateItem";

export async function GET(
    req: NextRequest,
    { params }: { params: { itemId: number } }
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
        const item = await fetchItem(client, params.itemId);

        if (!item) {
            return NextResponse.json(
                { message: "Articolo non trovato." },
                { status: 404 }
            );
        }

        return NextResponse.json({ item }, { status: 200 });
    } catch (error) {
        console.error("Errore API fetchItem:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}

// Disable the default body parser (required for file uploads)
export const config = {
    api: {
        bodyParser: false,
    },
};

export async function PUT(
    req: NextRequest,
    { params }: { params: { itemId: number } }
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
        const success = await updateItem(client, params.itemId, body);

        if (!success) {
            return NextResponse.json(
                { message: "Aggiornamento fallito. Articolo non trovato." },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { message: "Articolo aggiornato con successo." },
            { status: 200 }
        );
    } catch (error) {
        console.error("Errore API updateItem:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
