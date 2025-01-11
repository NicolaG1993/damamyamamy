import { NextResponse } from "next/server";

export async function POST() {
    console.log("🔥 Logout API invoked! 🔥");

    try {
        // Clear the session cookie
        const response = NextResponse.json(
            { message: "Logout successful" },
            { status: 200 }
        );
        response.cookies.set("damamyamamy_auth_token", "", { maxAge: 0 }); // Clear cookie
        return response;
    } catch (error) {
        console.error("Error during logout:", error);
        return NextResponse.json(
            { message: "Internal server error" },
            { status: 500 }
        );
    }
}
