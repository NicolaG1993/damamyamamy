import { NextRequest, NextResponse } from "next/server";
import { connect, release, rollback } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { addItem } from "@/database/utils/addItem";

// Disable the default body parser (required for file uploads)
export const config = {
    api: {
        bodyParser: false,
    },
};

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
    const formData = await req.formData();
    // const itemData = JSON.parse(formData.get("item") as string);
    // const pictures = formData.getAll("pictures") as File[];

    const {
        name,
        price,
        stock,
        slug,
        description,
        condition,
        brand,
        owner,
        categories,
    } = Object.fromEntries(formData.entries()); // Convert form data to an object
    const parsedBrand = brand ? JSON.parse(brand as string) : undefined;
    const parsedOwner = owner ? JSON.parse(owner as string) : undefined;
    const parsedCategories = categories ? JSON.parse(categories as string) : [];
    const pics = formData.getAll("pics"); // Get all files uploaded as "pics"

    if (!name || !owner || !condition || !price || !slug) {
        return NextResponse.json(
            { message: "Dati mancanti. Controlla item e immagini." },
            { status: 400 }
        );
    }

    // Connect to the database
    const client = await connect();

    try {
        // Add item to the database
        const { itemId, itemSlug } = await addItem(client, {
            name: name as string,
            price: Number(price),
            stock: Number(stock),
            slug: slug as string,
            description: description as string,
            condition: condition as "new" | "used" | "refurbished",
            brand: parsedBrand,
            owner: parsedOwner,
            categories: parsedCategories,
            pics, // File references (you can store the file URLs in your database)
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
            {
                message: "Errore server",
                error: error instanceof Error ? error.message : "Errore server",
            },
            { status: 500 }
        );
    } finally {
        release(client);
    }
}
