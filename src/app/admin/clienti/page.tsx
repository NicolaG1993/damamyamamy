"use client";

import { useEffect, useState } from "react";
import ClientsTable from "@/components/tables/ClientsTable";
import { handleAxiosError } from "@/utils/axiosUtils";
import { getClients } from "@/services/client";
import { Client } from "@/types/client";
import Link from "next/link";

export default function UtentiRiservati() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await getClients();
                setClients(response);
            } catch (err) {
                console.error("Clients fetching failed:", err);
                setError(handleAxiosError(err));
            }
        };

        fetchClients();
        setIsLoading(false);
    }, []);

    return (
        <div className="page">
            <main>
                <section>
                    {error ? (
                        <div className="error">{error}</div>
                    ) : isLoading ? (
                        <div className="loading">Caricamento...</div>
                    ) : (
                        <div>
                            <h1>Lista clienti</h1>
                            <Link href={"/admin"} className="go-back">
                                Torna indietro
                            </Link>
                            <ClientsTable clients={clients} />
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
