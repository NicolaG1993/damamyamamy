"use client";

import ItemForm from "@/components/forms/ItemForm";
import { createItem } from "@/services/item";
import { CreateItemResponse } from "@/types/item";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CreaArticolo() {
    const router = useRouter();

    const handleAddItem = async (formData: FormData) => {
        const response: CreateItemResponse = await createItem(formData);
        if (response?.itemId) {
            router.push(`/admin/articoli/${response.itemId}`);
        } else {
            throw new Error(response.message || "Failed to create item");
        }
    };

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Crea nuovo articolo</h1>
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
