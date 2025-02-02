import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { fetchShopItems } from "@/database/utils/fetchShopItems";

export async function GET(req: NextRequest) {
    // Step 1: Parse query parameters
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const countPerPage = parseInt(searchParams.get("countPerPage") || "10", 10);
    const brand = searchParams.get("brand") || undefined;
    const category = searchParams.get("category") || undefined;
    const maxPrice = searchParams.get("maxPrice")
        ? parseFloat(searchParams.get("maxPrice")!)
        : undefined;
    const minPrice = searchParams.get("minPrice")
        ? parseFloat(searchParams.get("minPrice")!)
        : undefined;
    const search = searchParams.get("search") || undefined;
    const order = searchParams.get("order") === "desc" ? "DESC" : "ASC";

    // Step 2: Connect to the database
    const client = await connect();

    try {
        // Step 3: Fetch items from the database
        const { items, total } = await fetchShopItems(client, {
            page,
            countPerPage,
            brand,
            category,
            maxPrice,
            minPrice,
            search,
            order,
        });

        return NextResponse.json({ total, items }, { status: 200 });
    } catch (error) {
        console.error("Errore API shop page:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
