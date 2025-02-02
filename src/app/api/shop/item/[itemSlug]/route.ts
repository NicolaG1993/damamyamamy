import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { fetchShopItem } from "@/database/utils/fetchShopItem";

export async function GET(
    req: NextRequest,
    context: { params: Promise<{ itemSlug: string }> }
) {
    const { params } = context;
    const { itemSlug } = await params;

    const client = await connect();

    try {
        const item = await fetchShopItem(client, itemSlug);

        if (!item) {
            return NextResponse.json(
                { message: "Articolo non trovato." },
                { status: 404 }
            );
        }

        return NextResponse.json({ item }, { status: 200 });
    } catch (error) {
        console.error("Errore API fetchShopItem:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
