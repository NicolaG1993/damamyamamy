"use client";

import { useEffect, useState } from "react";
import ItemsTable from "@/components/tables/ItemsTable";
import { handleAxiosError } from "@/utils/axiosUtils";
import { getItems } from "@/services/item";
import { Item } from "@/types/item";
import Link from "next/link";

export default function Articoli() {
    const [items, setItems] = useState<Item[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const response = await getItems();
                setItems(response);
            } catch (err) {
                console.error("Items fetching failed:", err);
                setError(handleAxiosError(err));
            }
        };

        fetchItems();
        setIsLoading(false);
    }, []);

    return (
        <div className="page">
            <main>
                <section>
                    {error ? (
                        <div className="error">{error}</div>
                    ) : isLoading ? (
                        <div className="loading">Caricamento...</div>
                    ) : (
                        <div>
                            <h1>Lista articoli</h1>
                            <Link href={"/admin"} className="go-back">
                                Torna indietro
                            </Link>
                            <ItemsTable items={items} />
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}
