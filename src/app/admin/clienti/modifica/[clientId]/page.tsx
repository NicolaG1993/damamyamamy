"use client";

import ClientForm from "@/components/forms/ClientForm";
import { getClientToEdit, editClient } from "@/services/client";
import { ClientFormData } from "@/types/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";

export default function ModificaCliente({
    params,
}: {
    params: Promise<{ clientId: number }>;
}) {
    const { clientId } = use(params);
    const router = useRouter();
    const [client, setClient] = useState<ClientFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadClient = async () => {
            try {
                const data: ClientFormData = await getClientToEdit(clientId);
                setClient(data);
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
            router.push(`/admin/clienti/${clientId}`);
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
