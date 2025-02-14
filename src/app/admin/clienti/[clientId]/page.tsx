"use client";

import AdminClient from "@/components/Admin/AdminClient/AdminClient";
import { getClient } from "@/services/client";
import { Client } from "@/types/client";
import { handleAxiosError } from "@/utils/axiosUtils";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function Utente({
    params,
}: {
    params: Promise<{ clientId: number }>;
}) {
    const { clientId } = use(params);
    const [client, setClient] = useState<Client | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClient = async () => {
            try {
                const response = await getClient(clientId);
                setClient(response);
            } catch (err) {
                console.error("Client fetching failed:", err);
                // setError("Failed to load item data.");
                setError(handleAxiosError(err as Error)); // TEST 🧠
            } finally {
                setIsLoading(false);
            }
        };

        fetchClient();
    }, [clientId]);

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Cliente</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : isLoading ? (
                            <div className="loading">Caricamento...</div>
                        ) : client ? (
                            <>
                                <AdminClient client={client} />
                                <button className="">
                                    <Link
                                        href={`/admin/clienti/modifica/${client.id}`}
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
