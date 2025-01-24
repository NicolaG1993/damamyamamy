"use client";

import ClientForm from "@/components/forms/ClientForm";
import { createClient } from "@/services/client";
import { ClientFormData, CreateClientResponse } from "@/types/client";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreaCliente() {
    const router = useRouter();

    const handleAddClient = async (formData: ClientFormData) => {
        const response: CreateClientResponse = await createClient(formData);
        if (response?.clientId) {
            router.push(`/admin/clienti/${response.clientId}`);
        } else {
            throw new Error(response.message || "Failed to create client");
        }
    };

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Crea nuovo cliente</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        <ClientForm
                            onSubmit={handleAddClient}
                            buttonText="Crea"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
