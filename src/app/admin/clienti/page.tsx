"use client";

import { useEffect, useState } from "react";
import ClientsTable from "@/components/tables/ClientsTable";
import { handleAxiosError } from "@/utils/axiosUtils";
import { getClients } from "@/services/client";
import { Client } from "@/types/client";
import Link from "next/link";

export default function Clienti() {
    const [clients, setClients] = useState<Client[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchClients = async () => {
            try {
                const response = await getClients(); // type missing
                setClients(response);
            } catch (err) {
                console.error("Clients fetching failed:", err);
                setError(handleAxiosError(err as Error));
            } finally {
                setIsLoading(false);
            }
        };

        fetchClients();
    }, []);

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Lista clienti</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : (
                            <ClientsTable
                                clients={clients}
                                isLoading={isLoading}
                            />
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
