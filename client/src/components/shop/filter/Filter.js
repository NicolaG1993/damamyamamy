import React, { useState, useEffect } from "react";

export default function Filter({ userFilters }) {
    const [filters, setFilters] = useState({});

    useEffect(() => {
        if (filters) {
            console.log("filters in useEffect: ", filters);
        }
    }, [filters]);

    const handleForm = (e) => {
        // console.log("e in form", e);
        e.preventDefault(); // mi serve?
        const form = e.target.form;

        if (form[1].value > form[2].value) {
            form[2].value = form[1].value;
        }

        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());

        // setFilters(allValues);
        userFilters(allValues);
    };

    return (
        <div className={"filter-bar"}>
            <form onChange={(e) => handleForm(e)}>
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
                        name="priceMin"
                        id="priceMin"
                    />
                </label>
                <label>
                    max.
                    <input
                        type="number"
                        defaultValue="1000"
                        min={filters.priceMin}
                        max="1000"
                        name="priceMax"
                        id="priceMax"
                    />
                </label>
                <br />
                <label>
                    Categorie
                    <select name="categories" id="categories">
                        <option value="">Please Choose...</option>
                        <option value="Giochi">Giochi</option>
                        <option value="Alimentazione">Alimentazione</option>
                    </select>
                </label>
            </form>
        </div>
    );
}

// nell'input prezzo max devo passare come valore minimo il valore di prezzo minimo, non 0 🐲
// devo creare uno state che si aggiorna con un handleChange {[e.target.name]: e.target.value} 🐲

// in categorie input devo fare un map di tutte le categorie esistenti (quindi non devo cercarle in products mi sa, devo fare un nuovo fetch) guarda AddressForm 🐔

//max price non deve scendere sotto min-price (mai!!) // forse fare handleChange su min price, se max price value é piu basso settare il nuovo valore 🐲
// 🐔🐲
