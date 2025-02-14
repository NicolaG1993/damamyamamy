"use client";

import { useEffect, useState } from "react";
import ItemsTable from "@/components/tables/ItemsTable";
import { handleAxiosError } from "@/utils/axiosUtils";
import { getItems } from "@/services/item";
import { ItemsTableRow } from "@/types/item";
import Link from "next/link";

export default function Articoli() {
    const [items, setItems] = useState<ItemsTableRow[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getItems();
                setItems(response);
            } catch (err) {
                console.error("Items fetching failed:", err);
                setError(handleAxiosError(err as Error));
            } finally {
                setIsLoading(false);
            }
        };

        fetchItems();
    }, []);

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
                        ) : isLoading ? (
                            <div className="loading">Caricamento...</div>
                        ) : items && !!items.length ? (
                            <ItemsTable items={items} />
                        ) : (
                            <div className="error">Nessun risultato</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
