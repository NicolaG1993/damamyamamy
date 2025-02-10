import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { fetchItemFormData } from "@/database/utils/fetchItem";
import { ItemFormData } from "@/types/item";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ itemId: number }> }
) {
    const { params } = context;
    const { itemId } = await params;

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
        const item: ItemFormData = await fetchItemFormData(client, itemId);

        if (!item) {
            return NextResponse.json(
                { message: "Articolo non trovato." },
                { status: 404 }
            );
        }

        return NextResponse.json({ item }, { status: 200 });
    } catch (error) {
        console.error("Errore API fetchItemFormData:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
