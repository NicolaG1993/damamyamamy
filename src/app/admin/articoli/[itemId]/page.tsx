"use client";

import AdminItem from "@/components/Admin/AdminItem/AdminItem";
import { getItem } from "@/services/item";
import { Item } from "@/types/item";
import { handleAxiosError } from "@/utils/axiosUtils";
import Link from "next/link";
import { use, useEffect, useState } from "react";

export default function Articolo({
    params,
}: {
    params: Promise<{ itemId: number }>;
}) {
    const { itemId } = use(params);
    const [item, setItem] = useState<Item | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await getItem(itemId);
                setItem(response);
            } catch (err) {
                console.error("Item fetching failed:", err);
                // setError("Failed to load item data.");
                setError(handleAxiosError(err)); // TEST 🧠
            } finally {
                setIsLoading(false);
            }
        };

        fetchItem();
    }, [itemId]);

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        <h1>Articolo</h1>
                        <Link href={"/admin"} className="go-back">
                            Torna indietro
                        </Link>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : isLoading ? (
                            <div className="loading">Caricamento...</div>
                        ) : item ? (
                            <>
                                <AdminItem item={item} />
                                <button className="">
                                    <Link
                                        href={`/admin/articoli/modifica/${item.id}`}
                                        className="go-back"
                                    >
                                        Modifica
                                    </Link>
                                </button>
                            </>
                        ) : (
                            <div className="error">Articolo non trovato</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
