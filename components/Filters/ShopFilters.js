import useSessionStorage from "@/utils/useSessionStorage";
import { useEffect, useState } from "react";

let allCategories = [];

export default function ShopFilters({ filters, handleFilters }) {
    useEffect(() => {
        console.log("filters: ", filters);
    }, [filters]);

    return (
        <form>
            <label htmlFor={"page"}>
                Pagina
                <input
                    name="page"
                    id="page"
                    type="number"
                    min={1}
                    value={filters.page || 1}
                    onChange={(e) =>
                        handleFilters(e.target.name, e.target.value)
                    }
                />
            </label>

            <label htmlFor={"order"}>
                Ordina per
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
            </label>
            <label htmlFor={"category"}>
                Categorie
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
            </label>
            <label htmlFor={"research"}>
                Ricerca
                <input
                    name="research"
                    id="research"
                    type="text"
                    value={filters.research}
                    onChange={(e) =>
                        handleFilters(e.target.name, e.target.value)
                    }
                />
            </label>
        </form>
    );
}

// salvare direttamente tutto form invece di inputs?
// usare redux é piu semplice?
