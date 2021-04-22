import React, { useState, useEffect } from "react";

export default function Filter() {
    // const [filters, setFilters] = useState([]);

    // const [name, setName] = useState("");
    // const [minPrice, setMinPrice] = useState(0);
    // const [maxPrice, setMaxPrice] = useState(1000);
    // const [categories, setCategories] = useState([]);

    // useEffect(() => {});

    // const handleChange = (e) => {
    //     setFilter(e.target.value);
    // };

    return (
        <div className={"filter-bar"}>
            <label>
                Ricerca per nome
                <input type="text" name="name" id="name" />
            </label>
            <br />
            <label>
                Prezzo minimo
                <input
                    type="number"
                    defaultValue="0"
                    min="0"
                    max="1000"
                    name="price"
                    id="price"
                />
            </label>
            <label>
                max.
                <input
                    type="number"
                    min="0"
                    max="1000"
                    name="price"
                    id="price"
                />
            </label>
            <br />
            <label>
                Categorie
                <select name="categories" id="categories">
                    <option value="Giochi">Giochi</option>
                    <option value="Alimentazione">Alimentazione</option>
                </select>
            </label>
        </div>
    );
}

// nell'input prezzo max devo passare come valore minimo il valore di prezzo minimo, non 0
// devo creare uno state che si aggiorna con un handleChange {[e.target.name]: e.target.value}
// il problema é quando uno si aggiorna gli altri devono rimanere invariati // tipo form object?
// ci vuole sicuramente un onChange={} su ogni input
