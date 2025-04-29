"use client";

import { useCallback, useEffect, useState } from "react";
import ItemsTable from "@/components/tables/ItemsTable";
import { handleAxiosError } from "@/utils/axiosUtils";
import { getItems, getSoldItems, sellItem, unsellItem } from "@/services/item";
import { ItemsTableRow } from "@/types/item";
import Link from "next/link";

export default function Articoli() {
    const [items, setItems] = useState<ItemsTableRow[]>([]);
    const [soldItemsView, setSoldItemsView] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchItems = useCallback(async () => {
        setIsLoading(true);
        try {
            const response = soldItemsView
                ? await getSoldItems()
                : await getItems();
            setItems(response);
        } catch (err) {
            console.error("Items fetching failed:", err);
            setError(handleAxiosError(err as Error));
        } finally {
            setIsLoading(false);
        }
    }, [soldItemsView]);

    useEffect(() => {
        fetchItems();
    }, [fetchItems]);

    const handleView = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked } = e.target;
        setSoldItemsView(!checked);
    };

    const handleSellItem = async (itemId: number) => {
        try {
            await sellItem(itemId);
            await fetchItems();
        } catch (err) {
            console.error("Error updating item:", err);
            setError("Failed to update item.");
        }
    };
    const handleUnsellItem = async (itemId: number) => {
        try {
            await unsellItem(itemId);
            await fetchItems();
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
                        <h1>Lista articoli</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : (
                            <ItemsTable
                                items={items}
                                isLoading={isLoading}
                                soldItemsView={soldItemsView}
                                handleView={handleView}
                                handleSellItem={handleSellItem}
                                handleUnsellItem={handleUnsellItem}
                            />
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
