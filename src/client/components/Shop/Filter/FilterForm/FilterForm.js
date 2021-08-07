import { useState, useEffect } from "react";
import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";

export default function FilterForm({
    research,
    handleForm,
    handleFormOrder,
    priceRange,
    handlePriceRange,
    setPriceRange,
    handleRangeSlider,
    categories,
    filters,
    topValue,
}) {
    const [appliedFilters, setAppliedFilters] = useState(filters);
    useEffect(() => setAppliedFilters(filters), [filters]);

    console.log("appliedFilters", appliedFilters);
    return (
        <form className="filter-form">
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
                        max={topValue}
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
                    maxValue={topValue}
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
                <SelectCat
                    defaultValue={appliedFilters.categoryID}
                    handleForm={handleForm}
                    categories={categories}
                />
            </div>

            <div className="filter-form-col-left">
                <label>
                    <span>Ordina per</span>
                </label>
            </div>
            <div className="filter-form-col-right">
                <SelectOrder handleFormOrder={handleFormOrder} />
            </div>
        </form>
    );
}

function SelectCat({ defaultValue, handleForm, categories }) {
    console.log("FilterForm Select: ", defaultValue);
    return (
        <select
            name="category"
            id="category"
            value={defaultValue || ""}
            onChange={(e) => handleForm(e)}
        >
            {categories &&
                categories.map((category) => (
                    <option
                        key={category.animalID}
                        value={category.animalID}
                        label={category.animal}
                    ></option>
                ))}
            <option value="" label="--Tutte"></option>
        </select>
    );
}

function SelectOrder({ handleFormOrder }) {
    return (
        <select name="order" id="order" onChange={(e) => handleFormOrder(e)}>
            <option value="new">Novitá</option>
            {/* <option value="relevant">Rilevanza --?</option> */}
            <option value="asc">Ordine alfabetico A-Z</option>
            <option value="desc">Ordine alfabetico Z-A</option>
            <option value="lowPrice">Prezzo piú basso</option>
            <option value="highPrice">Prezzo piú alto</option>
        </select>
    );
}

// prevent re render
// attivare altri filtri (uno alla volta!)
// testare App
