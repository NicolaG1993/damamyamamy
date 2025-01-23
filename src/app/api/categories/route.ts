import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { searchCategories } from "@/database/utils/searchCategories";

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

    // Step 3: Retrieve the search query
    const { search } = Object.fromEntries(req.nextUrl.searchParams);

    if (!search || typeof search !== "string") {
        return NextResponse.json(
            { message: "Parametro di ricerca non valido o mancante." },
            { status: 400 }
        );
    }

    // Step 4: Connect to the database and fetch categories
    const poolClient = await connect();

    try {
        const categories = await searchCategories(poolClient, search);

        if (!categories || categories.length === 0) {
            return NextResponse.json(
                { message: "Nessuna categoria trovata." },
                { status: 404 }
            );
        }

        return NextResponse.json({ categories }, { status: 200 });
    } catch (error) {
        console.error("Errore API categories:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(poolClient);
    }
}
