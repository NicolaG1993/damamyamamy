import React, { useState, useEffect } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

export default function Filter({
    categories,
    userFilters,
    highestPrice,
    research,
}) {
    const [priceRange, setPriceRange] = useState({ min: 0, max: highestPrice });
    const [filters, setFilters] = useState({
        name: research || "",
        priceMin: priceRange.min,
        priceMax: priceRange.max,
        category: "",
        order: "new",
    });
    // console.log("filters!!!: ", filters);
    // console.log("highestPrice: ", highestPrice);

    const [filtersBar, setFiltersBarBar] = useState(false);

    useEffect(() => {
        setPriceRange({ min: 0, max: highestPrice });
    }, [highestPrice]);

    const toggleBar = async () => {
        setFiltersBarBar(!filtersBar);
    };

    const handleForm = (e) => {
        // console.log("e in form", e);
        e.preventDefault(); // mi serve?
        const form = e.target.form;

        setTimeout(() => {
            if (Number(form[1].value) >= Number(form[2].value)) {
                form[2].value = form[1].value;
            }
            setPriceRange({
                min: Number(form[1].value),
                max: Number(form[2].value),
            });

            // Number() per convertire da numero a string
        }, 300);

        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());

        setFilters(allValues);
    };

    const handlePriceRange = (value) => {
        // console.log("value in handlePriceRange: ", value);
        setPriceRange(value);
        // console.log("priceRange: ", priceRange);
    };

    const handleRangeSlider = () => {
        // console.log("value in handlePriceRange: ", value);
        let minInput = document.querySelector("#priceMin");
        let maxInput = document.querySelector("#priceMax");
        minInput.value = priceRange.min;
        maxInput.value = priceRange.max;
        setFilters({
            name: filters.name,
            priceMin: priceRange.min,
            priceMax: priceRange.max,
            category: filters.category,
            order: filters.order,
        });
    };

    useEffect(() => {
        userFilters(filters);
    }, [filters]);

    return (
        <div
            className={`filter-bar ${
                filtersBar ? "filter-bar-active" : "filter-bar-inactive"
            }`}
        >
            <div className="filter-bar-header" onClick={() => toggleBar()}>
                <h3>Filtra risultati</h3>

                <div
                    id="hamBtn2"
                    className={filtersBar ? "hamBtn active" : "hamBtn"}
                >
                    <div className={"stick"}></div>
                </div>
            </div>

            <form className={filtersBar ? "filter-form" : "hidden2"}>
                <div className="filter-form-col-left">
                    <label>
                        <span>Ricerca per nome</span>
                    </label>
                </div>
                <div className="filter-form-col-right">
                    <input
                        type="text"
                        placeholder="Cerca..."
                        defaultValue={research || ""}
                        name="name"
                        id="name"
                        onChange={(e) => handleForm(e)}
                    />
                </div>

                <div className="filter-form-col-left">
                    <label>
                        <span>Ricerca per prezzo</span>
                    </label>
                </div>

                <div className="filter-form-col-right">
                    <div className="filter-form-prices">
                        <input
                            type="number"
                            min="0"
                            max={highestPrice}
                            defaultValue={priceRange.min}
                            name="priceMin"
                            id="priceMin"
                            onChange={(e) =>
                                handlePriceRange({
                                    min: Number(e.target.value),
                                    max: priceRange.max,
                                })
                            }
                            onInput={(e) => handleForm(e)}
                        />
                        <input
                            type="number"
                            min={priceRange.min}
                            max={priceRange.max}
                            defaultValue={priceRange.max}
                            name="priceMax"
                            id="priceMax"
                            onChange={(e) =>
                                handlePriceRange({
                                    min: priceRange.min,
                                    max: Number(e.target.value),
                                })
                            }
                            onInput={(e) => handleForm(e)}
                        />
                    </div>
                </div>

                <div className="filter-form-col-full">
                    <InputRange
                        maxValue={highestPrice}
                        minValue={0}
                        value={
                            priceRange.max < priceRange.min
                                ? {
                                      min: priceRange.min,
                                      max: priceRange.min,
                                  }
                                : priceRange
                        }
                        formatLabel={(value) => `${value} €`}
                        onChange={(value) => setPriceRange(value)}
                        onChangeComplete={() => handleRangeSlider()}
                    />
                </div>

                <div className="filter-form-col-left">
                    <label>
                        <span>Categorie</span>
                    </label>
                </div>
                <div className="filter-form-col-right">
                    <select
                        name="category"
                        id="category"
                        onChange={(e) => handleForm(e)}
                    >
                        <option value="">--Tutte</option>

                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="filter-form-col-left">
                    <label>
                        <span>Ordina per</span>
                    </label>
                </div>
                <div className="filter-form-col-right">
                    <select
                        name="order"
                        id="order"
                        onChange={(e) => handleForm(e)}
                    >
                        <option value="new">Novitá</option>
                        {/* <option value="relevant">Rilevanza --?</option> */}
                        <option value="asc">Ordine alfabetico A-Z</option>
                        <option value="desc">Ordine alfabetico Z-A</option>
                        <option value="lowPrice">Prezzo piú basso</option>
                        <option value="highPrice">Prezzo piú alto</option>
                    </select>
                </div>
            </form>
        </div>
    );
}

// nell'input prezzo max devo passare come valore minimo il valore di prezzo minimo, non 0 🐲
// devo creare uno state che si aggiorna con un handleChange {[e.target.name]: e.target.value} 🐲

// in categorie input devo fare un map di tutte le categorie esistenti (quindi non devo cercarle in products mi sa, devo fare un nuovo fetch) guarda AddressForm 🐲

//max price non deve scendere sotto min-price (mai!!) // forse fare handleChange su min price, se max price value é piu basso settare il nuovo valore 🐲
// 🐔🐲

// inputLeft.addEventListener("mouseover", function () {
//     thumbLeft.classList.add("hover");
// });
// inputLeft.addEventListener("mouseout", function () {
//     thumbLeft.classList.remove("hover");
// });
// inputLeft.addEventListener("mousedown", function () {
//     thumbLeft.classList.add("active");
// });
// inputLeft.addEventListener("mouseup", function () {
//     thumbLeft.classList.remove("active");
// });

// inputRight.addEventListener("mouseover", function () {
//     thumbRight.classList.add("hover");
// });
// inputRight.addEventListener("mouseout", function () {
//     thumbRight.classList.remove("hover");
// });
// inputRight.addEventListener("mousedown", function () {
//     thumbRight.classList.add("active");
// });
// inputRight.addEventListener("mouseup", function () {
//     thumbRight.classList.remove("active");
// });
