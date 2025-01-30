import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { middlewareVerifyToken } from "@/utils/jwtUtils";
import { fetchItem } from "@/database/utils/fetchItem";
import { updateItem } from "@/database/utils/updateItem";
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
        const item = await fetchItem(client, itemId);

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
    context: { params: Promise<{ itemId: number }> }
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
        const { params } = context;
        const { itemId } = await params;
        const formData = await req.formData();

        // Extract form fields
        const name = formData.get("name") as string;
        const price = formData.get("price") as string;
        const brand = formData.get("brand")
            ? JSON.parse(formData.get("brand") as string)
            : null;
        const categories = JSON.parse(formData.get("categories") as string);
        const condition = formData.get("condition") as
            | "new"
            | "used"
            | "refurbished";
        const stock = formData.get("stock") as string;
        const slug = formData.get("slug") as string;
        const description = formData.get("description") as string;
        const owner = JSON.parse(formData.get("owner") as string);

        const pics: (File | string)[] = [];
        formData.getAll("pics").forEach((file) => {
            pics.push(file as File | string);
        });

        const body: ItemFormData = {
            name,
            price: parseFloat(price),
            brand,
            categories,
            condition,
            stock: Number(stock),
            slug,
            description,
            owner,
            pics,
        };

        const success = await updateItem(client, itemId, body);

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
