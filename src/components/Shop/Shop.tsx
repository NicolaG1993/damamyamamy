"use client";

import { useEffect, useState } from "react";
import styles from "./Shop.module.css";
import ShopFilters from "./ShopFilters";
import PageNav from "@/components/shared/PageNav/PageNav";
import ShopItems from "./ShopItems";
import ShopItemsSkeleton from "./ShopItemsSkeleton";
import { PAGINATION } from "@/constants/config";
import { getShopFilters, getShopPage } from "@/services/shop";
import { useRouter, useSearchParams } from "next/navigation";
import { ShopItemPreview, ShopPageFilters } from "@/types/shop";

export default function Shop() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState<ShopItemPreview[]>();
    const [totalPages, setTotalPages] = useState(1);
    const [allCategories, setAllCategories] = useState<string[]>([]);
    const [allBrands, setAllBrands] = useState<string[]>([]);
    const countPerPage = PAGINATION.defaultPageSize;
    const [filters, setFilters] = useState<ShopPageFilters>({
        page: 1,
        order: "DESC",
        minPrice: undefined,
        maxPrice: undefined,
        search: "",
        brand: "",
        category: "",
        countPerPage,
    });

    const fetchFilters = async () => {
        try {
            const data = await getShopFilters();
            setAllCategories(data.categories);
            setAllBrands(data.brands);
        } catch (err) {
            console.error("Errore nel caricamento dei filtri", err);
        }
    };

    const fetchData = async (currentFilters: ShopPageFilters) => {
        setIsLoading(true);
        try {
            const data = await getShopPage(currentFilters);
            setItems(data.items);
            console.log({
                data,
                "Number(data.total)": Number(data.total),
                "currentFilters.countPerPage": currentFilters.countPerPage,
                "Total Pages": Math.ceil(
                    Number(data.total) / currentFilters.countPerPage
                ),
            });
            setTotalPages(
                Math.ceil(Number(data.total) / currentFilters.countPerPage)
            );
        } catch (err) {
            setItems([]);
            setTotalPages(1);
            alert(
                "Sembra che abbiamo dei problemi con il nostro sito. Riprova più tardi."
            );
            console.error("Error: ", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFilters = (name: string, value: string | number) => {
        const newFilters = { ...filters, [name]: value, page: 1 };
        setFilters(newFilters);

        // Update URL parameters
        const params = new URLSearchParams();
        Object.entries(newFilters).forEach(([key, val]) => {
            if (val) params.set(key, String(val));
        });
        router.push(`?${params.toString()}`);
    };

    useEffect(() => {
        if (searchParams) {
            const newFilters = {
                page: Number(searchParams.get("page")) || 1,
                order: searchParams.get("order") || "DESC",
                minPrice: searchParams.get("minPrice")
                    ? Number(searchParams.get("minPrice"))
                    : undefined,
                maxPrice: searchParams.get("maxPrice")
                    ? Number(searchParams.get("maxPrice"))
                    : undefined,
                search: searchParams.get("search") || "",
                brand: searchParams.get("brand") || "",
                category: searchParams.get("category") || "",
                countPerPage,
            };

            setFilters(newFilters);
        }
    }, [searchParams, countPerPage]);

    useEffect(() => {
        fetchFilters();
        if (filters) {
            fetchData(filters);
        }
    }, [filters, countPerPage]);

    return (
        <div>
            <div className={styles.filtersWrap}>
                <ShopFilters
                    filters={{ ...filters }}
                    handleFilters={handleFilters}
                    allCategories={allCategories}
                    allBrands={allBrands}
                    isLoading={isLoading}
                />
            </div>

            <PageNav
                totalPages={totalPages}
                page={filters.page}
                handleFilters={handleFilters}
            />

            {isLoading ? (
                <ShopItemsSkeleton />
            ) : !!items?.length ? (
                <ShopItems items={items} />
            ) : (
                <p className="center">Nessun risultato disponibile</p>
            )}

            <PageNav
                totalPages={totalPages}
                page={filters.page}
                handleFilters={handleFilters}
            />
        </div>
    );
}
