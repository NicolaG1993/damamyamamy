import { NextRequest, NextResponse } from "next/server";
import { connect, release } from "@/database/db";
import { fetchUserLogin } from "@/database/utils/fetchUserLogin";

export async function POST(req: NextRequest) {
    if (req.method !== "POST") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
        return NextResponse.json(
            { message: "Password o email mancante" },
            { status: 400 }
        );
    }

    const client = await connect();

    try {
        // Fetch user by email
        const user = await fetchUserLogin(client, email, password);

        if (!user) {
            return NextResponse.json(
                {
                    message:
                        "I dati di accesso che hai fornito non sono validi",
                },
                { status: 401 }
            );
        }

        const response = NextResponse.json(
            {
                token: user.token,
                user: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
            },
            { status: 200 }
        );

        response.cookies.set("damamyamamy_auth_token", user.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 60 * 60 * 24, // 1 day
        });

        return response;
    } catch (error) {
        console.error("Error in login API:", error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
