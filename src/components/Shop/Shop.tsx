"use client";

import { useAppDispatch, useAppSelector } from "@/redux/lib/hooks";
import { useEffect, useState } from "react";
import styles from "./Shop.module.css";
import { shallowEqual } from "react-redux";
import {
    saveShopFilters,
    selectShopFiltersState,
} from "@/redux/slices/formsSlice";
import ShopFilters from "./ShopFilters";
import PageNav from "@/components/shared/PageNav/PageNav";
import ShopItems from "./ShopItems";
import ShopItemsSkeleton from "./ShopItemsSkeleton";
import { PAGINATION } from "@/constants/config";

export default function Shop() {
    const [isLoading, setIsLoading] = useState(true);
    const [items, setItems] = useState();
    const [totalPages, setTotalPages] = useState(1);
    const [allCategories, setAllCategories] = useState();
    const countPerPage = PAGINATION.defaultPageSize;
    // const [filtersState, setFiltersState] = useState();
    const dispatch = useAppDispatch();
    const storedFilters = useAppSelector(selectShopFiltersState, shallowEqual);

    useEffect(() => {
        fetchData({ ...storedFilters, countPerPage });
    }, [storedFilters]);

    const handleFilters = (name: string, value) => {
        // let newState = { ...filtersState, [name]: value };
        // setFiltersState(newState);

        let newState;
        if (name == "category" || name == "order") {
            newState = { ...storedFilters, page: 1, [name]: value };
        } else {
            newState = { ...storedFilters, [name]: value };
        }

        dispatch(saveShopFilters(newState));
    };

    const fetchData = async (obj) => {
        try {
            const { data } = await axios.post("/api/get/all-items", obj);

            setItems(data.items);
            setAllCategories(data.all_categories);
            setTotalPages(
                Math.ceil(Number(data.full_count) / Number(countPerPage))
            );
        } catch (err) {
            setItems();
            setTotalPages(1);
            setAllCategories();
            // alert(getError(err));
            alert(
                "Sembra che abbiamo dei problemi con il nostro sito, riprova piú tardi oppure contattaci al 347 9792 644, ci scusiamo per il disagio."
            );
        }
    };

    return (
        <div>
            <div className={styles.filtersWrap}>
                <ShopFilters
                    filters={{ ...storedFilters, totalPages }}
                    handleFilters={handleFilters}
                    allCategories={allCategories}
                    isLoading={isLoading}
                />
            </div>

            <PageNav
                totalPages={totalPages}
                page={storedFilters.page}
                handleFilters={handleFilters}
            />

            {isLoading ? (
                <ShopItemsSkeleton />
            ) : !!items?.length ? (
                <ShopItems
                    data={items}
                    mockedData={[
                        { id: 1, name: "Articolo test 1", price: 5 },
                        { id: 2, name: "Articolo test 2", price: 5 },
                        { id: 3, name: "Articolo test 3", price: 5 },
                        { id: 4, name: "Articolo test 4", price: 5 },
                        { id: 5, name: "Articolo test 5", price: 5 },
                        { id: 6, name: "Articolo test 6", price: 5 },
                        { id: 7, name: "Articolo test 7", price: 5 },
                        { id: 8, name: "Articolo test 8", price: 5 },
                        { id: 9, name: "Articolo test 9", price: 5 },
                        { id: 10, name: "Articolo test 10", price: 5 },
                        { id: 11, name: "Articolo test 11", price: 5 },
                        { id: 12, name: "Articolo test 12", price: 5 },
                        { id: 13, name: "Articolo test 13", price: 5 },
                        { id: 14, name: "Articolo test 14", price: 5 },
                        { id: 15, name: "Articolo test 15", price: 5 },
                    ]}
                />
            ) : (
                <p className="center">Nessun risultato disponibile</p>
            )}

            <PageNav
                totalPages={totalPages}
                page={storedFilters.page}
                handleFilters={handleFilters}
            />
        </div>
    );
}
