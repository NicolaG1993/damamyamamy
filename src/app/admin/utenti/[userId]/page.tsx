"use client";

import AdminUser from "@/components/Admin/AdminUser/AdminUser";
import { getUser } from "@/services/user";
import { User } from "@/types/user";
import { handleAxiosError } from "@/utils/axiosUtils";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function Utente({
    params,
}: {
    params: Promise<{ userId: number }>;
}) {
    const { userId } = use(params);
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser(userId);
                setUser(response);
            } catch (err) {
                console.error("User fetching failed:", err);
                // setError("Failed to load item data.");
                setError(handleAxiosError(err)); // TEST 🧠
            } finally {
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Utente</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : isLoading ? (
                            <div className="loading">Caricamento...</div>
                        ) : user ? (
                            <>
                                <AdminUser user={user} />
                                <button className="">
                                    <Link
                                        href={`/admin/utenti/modifica/${user.id}`}
                                        className="go-back"
                                    >
                                        Modifica
                                    </Link>
                                </button>
                            </>
                        ) : (
                            <div className="error">Utente non trovato</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
