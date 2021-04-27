import React, { useState, useEffect } from "react";

export default function Filter({ categories, userFilters, filters }) {
    const [minValue, setMinValue] = useState(0);
    const [maxValue, setMaxValue] = useState(1000);

    const inputLeft = document.getElementById("priceMin");
    const inputRight = document.getElementById("priceMax");
    const thumbLeft = document.querySelector(".rangeslider > .thumb.left");
    const thumbRight = document.querySelector(".rangeslider > .thumb.right");
    const range = document.querySelector(".rangeslider > .range");

    function setLeftValue() {
        let _this = inputLeft;
        let min = parseInt(_this.min);
        let max = parseInt(_this.max);

        _this.value = Math.min(
            parseInt(_this.value),
            parseInt(inputRight.value) - 1
        );

        let percent = ((_this.value - min) / (max - min)) * 100;

        thumbLeft.style.left = percent + "%";
        range.style.left = percent + "%";

        setMinValue(_this.value);
        console.log("MinValue: ", minValue);
    }

    function setRightValue() {
        let _this = inputRight;
        let min = parseInt(_this.min);
        let max = parseInt(_this.max);

        _this.value = Math.max(
            parseInt(_this.value),
            parseInt(inputLeft.value) + 1
        );

        let percent = ((_this.value - min) / (max - min)) * 100;

        thumbRight.style.right = 100 - percent + "%";
        range.style.right = 100 - percent + "%";

        setMaxValue(_this.value);
        console.log("MaxValue: ", maxValue);
    }

    const handleForm = (e) => {
        // console.log("e in form", e);
        e.preventDefault(); // mi serve?
        const form = e.target.form;

        if (Number(form[1].value) >= Number(form[4].value)) {
            form[4].value = form[1].value;
        }
        // Number() per convertire da numero a string

        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());

        // setFilters(allValues);
        userFilters(allValues);
    };

    return (
        <div className={"filter-bar"}>
            <form>
                <label>
                    Ricerca per nome
                    <input
                        type="text"
                        placeholder="Cerca..."
                        name="name"
                        id="name"
                        onChange={(e) => handleForm(e)}
                    />
                </label>
                <br />

                {/* <input
                    type="number"
                    min="0"
                    max="1000"
                    defaultValue="0"
                    name="priceMin"
                    id="priceMin"
                    onChange={(e) => handleForm(e)}
                /> */}

                <div className={"multi-range-slider"}>
                    <label>
                        Prezzo minimo - max.
                        <input
                            type="range"
                            min="0"
                            max="1000"
                            defaultValue="0"
                            name="priceMin"
                            id="priceMin"
                            onChange={() => setLeftValue()}
                            onInput={(e) => handleForm(e)}
                        />
                        <input
                            type="range"
                            min={filters && filters.priceMin}
                            max="1000"
                            defaultValue="1000"
                            name="priceMax"
                            id="priceMax"
                            onChange={() => setRightValue()}
                            onInput={(e) => handleForm(e)}
                        />
                    </label>

                    <div className={"rangeslider"}>
                        <div className={"track"}></div>
                        <div className={"range"}></div>
                        <div className={"thumb left"}></div>
                        <div className={"thumb right"}></div>
                    </div>
                </div>

                {/* <input
                    type="number"
                    min={filters && filters.priceMin}
                    max="1000"
                    defaultValue="1000"
                    name="priceMax"
                    id="priceMax"
                    onChange={(e) => handleForm(e)}
                /> */}
                <br />

                <label>
                    Categorie
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
                </label>
                <br />

                <label>
                    Ordina per
                    <select
                        name="order"
                        id="order"
                        onChange={(e) => handleForm(e)}
                    >
                        <option value="new">Novitá</option>
                        <option value="relevant">Rilevanza</option>
                        <option value="lowPrice">Prezzo piú basso</option>
                        <option value="highPrice">Prezzo piú alto</option>
                    </select>
                </label>
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
