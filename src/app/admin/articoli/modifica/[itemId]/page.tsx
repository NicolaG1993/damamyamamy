import ItemForm from "@/components/forms/ItemForm";
import { getItemToEdit, editItem } from "@/services/item";
import { ItemFormData, Item } from "@/types/item";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ModificaArticolo({
    params,
}: {
    params: { itemId: number };
}) {
    const { itemId } = params;
    const router = useRouter();
    const [item, setItem] = useState<ItemFormData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadItem = async () => {
            try {
                const data: ItemFormData = await getItemToEdit(itemId);
                setItem(data);
            } catch (err) {
                console.error("Error fetching item:", err);
                setError("Failed to load item data.");
            } finally {
                setIsLoading(false);
            }
        };
        loadItem();
    }, [itemId]);

    const handleEditItem = async (formData: ItemFormData) => {
        try {
            await editItem(itemId, formData);
            router.push(`/admin/items`);
        } catch (err) {
            console.error("Error updating item:", err);
            setError("Failed to update item.");
        }
    };

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Modifica articolo</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : isLoading ? (
                            <div className="loading">Caricamento...</div>
                        ) : item ? (
                            <ItemForm
                                initialData={item}
                                onSubmit={handleEditItem}
                                buttonText="Salva modifiche"
                            />
                        ) : (
                            <div className="error">Articolo non trovato</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
