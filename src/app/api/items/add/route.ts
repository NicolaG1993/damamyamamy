import { NextRequest, NextResponse } from "next/server";
import { connect, release, rollback } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { addItem } from "@/database/utils/addItem";

export async function POST(req: NextRequest) {
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

    // Step 5: Procede with the Item creation
    const formData = await req.formData(); // 🧠 req.formdata or const body = await req.json() ? 🧠
    const itemData = JSON.parse(formData.get("item") as string);
    const pictures = formData.getAll("pictures") as File[];

    if (!itemData || !pictures.length) {
        return NextResponse.json(
            { message: "Dati mancanti. Controlla item e immagini." },
            { status: 400 }
        );
    }

    const client = await connect();

    try {
        const { itemId, itemSlug } = await addItem(client, {
            ...itemData,
            pictures,
        });

        if (!itemId) {
            return NextResponse.json(
                { message: "Non è stato possibile creare l'articolo" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            {
                message:
                    "Articolo, brand, categorie e immagini salvati con successo.",
                itemId,
                itemSlug,
            },
            { status: 201 }
        );
    } catch (error) {
        await rollback(client);
        console.error("Errore API:", error);
        return NextResponse.json(
            { message: "Errore server", error: error.message },
            { status: 500 }
        );
    } finally {
        release(client);
    }
}
