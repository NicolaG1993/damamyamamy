import { NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { fetchShopFilters } from "@/database/utils/fetchShopFilters";

export async function GET() {
    const client = await connect();

    try {
        const { brands, categories } = await fetchShopFilters(client);

        return NextResponse.json(
            {
                brands,
                categories,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching filters:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
