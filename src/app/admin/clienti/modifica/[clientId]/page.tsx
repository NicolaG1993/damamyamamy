"use client";

import ClientForm from "@/components/forms/ClientForm";
import { getClient, editClient } from "@/services/client";
import { ClientFormData, Client } from "@/types/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModificaCliente({
    params,
}: {
    params: { clientId: number };
}) {
    const { clientId } = params;
    const router = useRouter();
    const [client, setClient] = useState<ClientFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadClient = async () => {
            try {
                const data: Client = await getClient(clientId);
                setClient({
                    firstName: data.firstName,
                    lastName: data.lastName,
                    email: data.email,
                    phone: data.phone,
                    code: data.code,
                });
            } catch (err) {
                console.error("Error fetching client:", err);
                setError("Failed to load client data.");
            } finally {
                setIsLoading(false);
            }
        };
        loadClient();
    }, [clientId]);

    const handleEditClient = async (formData: ClientFormData) => {
        try {
            await editClient(clientId, formData);
            router.push(`/admin/clients`);
        } catch (err) {
            console.error("Error updating client:", err);
            setError("Failed to update client.");
        }
    };

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Modifica cliente</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : isLoading ? (
                            <div className="loading">Caricamento...</div>
                        ) : client ? (
                            <ClientForm
                                initialData={client}
                                onSubmit={handleEditClient}
                                buttonText="Salva modifiche"
                            />
                        ) : (
                            <div className="error">Cliente non trovato</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
