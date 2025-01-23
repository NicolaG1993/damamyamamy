import ClientForm from "@/components/forms/ClientForm";
import { getClient, editClient } from "@/services/client";
import { ClientFormData, Client } from "@/types/client";
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
    const [loading, setLoading] = useState(true);
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
                setLoading(false);
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

    if (loading) {
        return <div>Caricamento...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!client) {
        return <div>Cliente non trovato.</div>;
    }

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Modifica client</h1>
                        <ClientForm
                            initialData={client}
                            onSubmit={handleEditClient}
                            buttonText="Salva modifiche"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
