import styles from "./ShopFilters.module.css";

export default function ShopFilters({
    filters,
    handleFilters,
    allCategories,
    isLoading,
}) {
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
                        disabled={isLoading}
                    />
                </label>
            </div>

            <div className={styles.filtersBarWrap}>
                <label htmlFor={"category"}>Categorie</label>
                <select
                    name="category"
                    id="category"
                    onChange={(e) =>
                        handleFilters(e.target.name, Number(e.target.value))
                    }
                    defaultValue={filters.category}
                    disabled={isLoading}
                >
                    <option value={0}>--Tutte--</option>
                    {allCategories &&
                        allCategories.map((el) => (
                            <option key={"category: " + el.id} value={el.id}>
                                {el.name}
                            </option>
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
                    disabled={isLoading}
                >
                    <option value="id_desc">Ultimi arrivi</option>
                    <option value="price_asc">Prezzo più basso</option>
                    <option value="price_desc">Prezzo più alto</option>
                    <option value="name_asc">Ordine alfabetico</option>
                </select>
            </div>
        </form>
    );
}
