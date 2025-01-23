import ItemForm from "@/components/forms/ItemForm";
import { getItemToEdit, editItem } from "@/services/item";
import { ItemFormData, Item } from "@/types/item";
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
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadItem = async () => {
            try {
                const data: ItemFormData = await getItemToEdit(itemId);
                setItem({
                    name: data.name,
                    price: data.price,
                    stock: data.stock,
                    slug: data.slug,
                    description: data.description,
                    condition: data.condition,
                    brand: data.brand,
                    categories: data.categories,
                    pics: data.pics,
                    owner: data.owner,
                });
            } catch (err) {
                console.error("Error fetching item:", err);
                setError("Failed to load item data.");
            } finally {
                setLoading(false);
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

    if (loading) {
        return <div>Caricamento...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!item) {
        return <div>Articolo non trovato.</div>;
    }

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Modifica articolo</h1>
                        <ItemForm
                            initialData={item}
                            onSubmit={handleEditItem}
                            buttonText="Salva modifiche"
                        />
                    </div>
                </section>
            </main>
        </div>
    );
}
