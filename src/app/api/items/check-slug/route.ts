import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { fetchItemSlug } from "@/database/utils/fetchItemSlug";

export async function GET(
    req: NextRequest
    // { params }: { params: { slug: string } }
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

    const slug = req.nextUrl.searchParams.get("slug");

    if (!slug || slug.trim() === "") {
        return NextResponse.json(
            { isUnique: false, message: "Slug mancante." },
            { status: 400 }
        );
    }

    const client = await connect();

    try {
        const result = await fetchItemSlug(client, slug);
        return NextResponse.json({ isUnique: result });
    } catch (error) {
        console.error("Errore API fetchItemSlug:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
