import { NextRequest, NextResponse } from "next/server";
import { addUser } from "@/database/utils/addUser";
import { connect, release } from "@/database/db";

export async function POST(req: NextRequest) {
    console.log("🔥 add user API invoked! 🔥");

    if (req.method !== "POST") {
        return NextResponse.json(
            { message: "Method not allowed" },
            { status: 405 }
        );
    }

    const body = await req.json();
    const { firstName, lastName, email, password, isAdmin } = body;

    if (!firstName || !lastName || !email || !password) {
        return NextResponse.json(
            { message: "Mancano delle informazioni" },
            { status: 400 }
        );
    }

    const client = await connect();

    try {
        const userId = await addUser(
            client,
            firstName,
            lastName,
            email,
            password,
            isAdmin || false
        );

        if (!userId) {
            return NextResponse.json(
                { message: "Non è stato possibile creare l'utente" },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { message: "Utente creato con successo!", userId },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json({ message: "Errore server" }, { status: 500 });
    } finally {
        release(client);
    }
}
