import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { fetchClientFormData } from "@/database/utils/fetchClient";
import { ClientFormData } from "@/types/client";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ clientId: number }> }
) {
    const { params } = context;
    const { clientId } = await params;

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

    const poolClient = await connect();

    try {
        const client: ClientFormData = await fetchClientFormData(
            poolClient,
            clientId
        );

        if (!client) {
            return NextResponse.json(
                { message: "Cliente non trovato." },
                { status: 404 }
            );
        }

        return NextResponse.json({ client }, { status: 200 });
    } catch (error) {
        console.error("Errore API fetchClient:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(poolClient);
    }
}
