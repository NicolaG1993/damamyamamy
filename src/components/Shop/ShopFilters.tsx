import { ShopPageFilters } from "@/types/shop";
import styles from "./ShopFilters.module.css";
import { useEffect, useState } from "react";
import { useDebounce } from "@/hooks/useDebounce";

interface ShopFiltersProps {
    filters: ShopPageFilters;
    handleFilters: (name: string, value: any) => void;
    allCategories: string[];
    allBrands: string[];
    isLoading: boolean;
}

export default function ShopFilters({
    filters,
    handleFilters,
    allCategories,
    allBrands,
    isLoading,
}: ShopFiltersProps) {
    const [searchInput, setSearchInput] = useState(filters.search || "");
    const debouncedSearch = useDebounce(searchInput, 500); // Delay API call by 500ms

    useEffect(() => {
        handleFilters("search", debouncedSearch);
    }, [debouncedSearch]);

    return (
        <form id={styles.ShopFilters}>
            <div className={styles.searchBarWrap}>
                <label htmlFor={"search"}>
                    {/* Ricerca */}
                    <input
                        name="search"
                        id="search"
                        placeholder="Cerca..."
                        type="text"
                        value={searchInput}
                        onChange={(e) => setSearchInput(e.target.value)}
                    />
                </label>
            </div>

            <div className={styles.filtersBarWrap}>
                <label htmlFor={"category"}>Categorie</label>
                <select
                    name="category"
                    id="category"
                    value={filters.category || ""}
                    onChange={(e) =>
                        handleFilters(e.target.name, e.target.value)
                    }
                    disabled={isLoading}
                >
                    <option value={""}>--Tutte--</option>
                    {allCategories &&
                        allCategories.map((category) => (
                            <option
                                key={"category: " + category}
                                value={category}
                            >
                                {category}
                            </option>
                        ))}
                </select>
            </div>

            <div className={styles.filtersBarWrap}>
                <label htmlFor={"brand"}>Marca</label>
                <select
                    name="brand"
                    id="brand"
                    value={filters.brand || ""}
                    onChange={(e) =>
                        handleFilters(e.target.name, e.target.value)
                    }
                    disabled={isLoading}
                >
                    <option value={""}>--Tutte--</option>
                    {allBrands &&
                        allBrands.map((brand) => (
                            <option key={"brand: " + brand} value={brand}>
                                {brand}
                            </option>
                        ))}
                </select>
            </div>

            <div className={styles.priceRangeWrap}>
                <div>
                    <label htmlFor={"minPrice"}>Prezzo minimo</label>
                    <input
                        name="minPrice"
                        id="minPrice"
                        value={filters.minPrice || ""}
                        onChange={(e) =>
                            handleFilters(e.target.name, Number(e.target.value))
                        }
                    />
                </div>

                <div>
                    <label htmlFor={"maxPrice"}>Prezzo massimo</label>
                    <input
                        name="maxPrice"
                        id="maxPrice"
                        value={filters.maxPrice || ""}
                        onChange={(e) =>
                            handleFilters(e.target.name, Number(e.target.value))
                        }
                    />
                </div>
            </div>

            <div className={styles.orderBarWrap}>
                <label htmlFor={"order"}>Ordina per</label>
                <select
                    name="order"
                    id="order"
                    onChange={(e) =>
                        handleFilters(e.target.name, e.target.value)
                    }
                    disabled={isLoading}
                >
                    {/* <option value="id_desc">Ultimi arrivi</option> 
                    <option value="price_asc">Prezzo più basso</option>
                    <option value="price_desc">Prezzo più alto</option>
                    <option value="name_asc">Ordine alfabetico</option>*/}
                    <option value="DESC">Più recenti</option>
                    <option value="ASC">Meno recenti</option>
                </select>
            </div>
        </form>
    );
}
