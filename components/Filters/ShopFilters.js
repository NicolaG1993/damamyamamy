import useSessionStorage from "@/utils/useSessionStorage";
import { useEffect, useState } from "react";
import styles from "./Filters.module.css";

let allCategories = [];

export default function ShopFilters({ filters, handleFilters }) {
    useEffect(() => {
        console.log("filters: ", filters);
    }, [filters]);

    return (
        <form id={styles.ShopFilters}>
            <div className={styles.searchBarWrap}>
                <label htmlFor={"research"}>
                    {/* Ricerca */}
                    <input
                        name="research"
                        id="research"
                        placeholder="Cerca..."
                        type="text"
                        value={filters.research}
                        onChange={(e) =>
                            handleFilters(e.target.name, e.target.value)
                        }
                    />
                </label>
            </div>

            <div className={styles.filtersBarWrap}>
                <label htmlFor={"category"}>Categorie</label>
                <select
                    name="category"
                    id="category"
                    onChange={(e) =>
                        handleFilters(e.target.name, e.target.value)
                    }
                    defaultValue={filters.category}
                >
                    {allCategories.map((el) => (
                        <option key={"category: " + el.id}>{el.name}</option>
                    ))}
                </select>
            </div>

            <div className={styles.orderBarWrap}>
                <label htmlFor={"order"}>Ordina per</label>
                <select
                    name="order"
                    id="order"
                    onChange={(e) =>
                        handleFilters(e.target.name, e.target.value)
                    }
                    defaultValue={filters.order}
                >
                    <option value="id_desc">Ultimi arrivi</option>
                    <option value="price_asc">Prezzo più basso</option>
                    <option value="price_desc">Prezzo più alto</option>
                    <option value="name_asc">Ordine alfabetico</option>
                </select>
            </div>

            <div className={styles.pagesBarWrap}>
                {/* <label htmlFor={"page"}>Pagina</label> */}
                {[...Array(filters.totalPages)].map((el, i) => (
                    <div key={"page selector " + i}>{i + 1}</div>
                ))}
                <input
                    name="page"
                    id="page"
                    type="number"
                    min={1}
                    max={filters.totalPages}
                    value={filters.page || 1}
                    onChange={(e) =>
                        handleFilters(e.target.name, e.target.value)
                    }
                />
            </div>
        </form>
    );
}

// salvare direttamente tutto form invece di inputs?
// usare redux é piu semplice?
