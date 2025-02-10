"use client";

import ShopItem from "@/components/Shop/ShopItem";
import { getShopItem } from "@/services/shop";
import { ShopItem as ShopItemType } from "@/types/shop";
import { handleAxiosError } from "@/utils/axiosUtils";
import { use, useEffect, useState } from "react";

export default function Articolo({
    params,
}: {
    params: Promise<{ itemSlug: string }>;
}) {
    const { itemSlug } = use(params);
    const [item, setItem] = useState<ShopItemType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchItem = async () => {
            try {
                const response = await getShopItem(itemSlug);
                setItem(response);
            } catch (err) {
                console.error("Item fetching failed:", err);
                setError(handleAxiosError(err));
            } finally {
                setIsLoading(false);
            }
        };

        fetchItem();
    }, [itemSlug]);

    return (
        <div className="page">
            <main>
                <section>
                    <div>
                        {error ? (
                            <div className="error">{error}</div>
                        ) : isLoading ? (
                            <div className="loading">Caricamento...</div>
                        ) : item ? (
                            <ShopItem item={item} />
                        ) : (
                            <div className="error">Articolo non trovato</div>
                        )}
                    </div>
                </section>
            </main>
        </div>
    );
}
