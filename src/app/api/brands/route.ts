import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { searchBrands } from "@/database/utils/searchBrands";

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

    // Step 4: Connect to the database and fetch brands
    const poolClient = await connect();

    try {
        const brands = await searchBrands(poolClient, search);

        if (!brands || brands.length === 0) {
            return NextResponse.json(
                { message: "Nessun brand trovato." },
                { status: 404 }
            );
        }

        return NextResponse.json({ brands }, { status: 200 });
    } catch (error) {
        console.error("Errore API brands:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(poolClient);
    }
}
