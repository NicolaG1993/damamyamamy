"use client";

import ItemForm from "@/components/forms/ItemForm";
import { createItem } from "@/services/item";
import { ItemFormData, CreateItemResponse } from "@/types/item";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreaProdotto() {
    const router = useRouter();

    const handleAddItem = async (formData: ItemFormData) => {
        const response: CreateItemResponse = await createItem(formData);
        if (response?.userId) {
            router.push(`/admin/prodotti`);
        } else {
            throw new Error(response.message || "Failed to create item");
        }
    };

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Crea nuovo prodotto</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        <ItemForm onSubmit={handleAddItem} buttonText="Crea" />
                    </div>
                </section>
            </main>
        </div>
    );
}
