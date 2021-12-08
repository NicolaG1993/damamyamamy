import InputRange from "react-input-range";
import "react-input-range/lib/css/index.css";
import DEFAULT_CLASS_NAMES from "react-input-range/src/js/input-range/default-class-names.js";
import styles from "./style/FilterForm.module.css";

export default function FilterForm({
    categories,
    topValue,
    research,
    handleForm,
    handleInputRange,
    filters,
    filtersBar,
}) {
    // console.log("DEFAULT_CLASS_NAMES", DEFAULT_CLASS_NAMES);
    console.log("categories", categories);
    const updateInputValues = () => {
        let minInput = document.querySelector("#priceMin");
        let maxInput = document.querySelector("#priceMax");
        minInput.value = filters.priceMin;
        maxInput.value = filters.priceMax;
    };

    return (
        <form className={`${filtersBar ? styles["filter-form"] : "hidden"}`}>
            <div className={styles["filter-form-col-left"]}>
                <label>
                    <span>Ricerca per nome</span>
                </label>
            </div>
            <div className={styles["filter-form-col-right"]}>
                <input
                    type="text"
                    placeholder="Cerca..."
                    defaultValue={research || ""}
                    name="name"
                    id="name"
                    onChange={(e) => handleForm(e)}
                />
            </div>

            <div className={styles["filter-form-col-left"]}>
                <label>
                    <span>Ricerca per prezzo</span>
                </label>
            </div>

            <div className={styles["filter-form-col-right"]}>
                <div className={styles["filter-form-prices"]}>
                    <input
                        type="number"
                        min={0}
                        max={topValue}
                        defaultValue={Number(filters.priceMin)}
                        name="priceMin"
                        id="priceMin"
                        onInput={(e) => handleForm(e)}
                    />
                    <input
                        type="number"
                        min={0}
                        max={topValue}
                        defaultValue={Number(filters.priceMax)}
                        name="priceMax"
                        id="priceMax"
                        onInput={(e) => handleForm(e)}
                    />
                </div>
            </div>

            <div className={styles["filter-form-col-full"]}>
                <InputRange
                    classNames={{
                        ...DEFAULT_CLASS_NAMES,
                        labelContainer: `input-range__label-container ${styles["my-label"]}`,
                        valueLabel: `input-range__label input-range__label--value ${styles["my-label"]}`,
                    }}
                    maxValue={topValue}
                    minValue={0}
                    value={{
                        min: Number(filters.priceMin),
                        max: Number(filters.priceMax),
                    }}
                    formatLabel={(value) => `${value} €`}
                    onChange={(value) => handleInputRange(value)}
                    onChangeComplete={() => updateInputValues()}
                />
            </div>

            <div className={styles["filter-form-col-left"]}>
                <label>
                    <span>Categorie</span>
                </label>
            </div>
            <div className={styles["filter-form-col-right"]}>
                <SelectCat handleForm={handleForm} categories={categories} />
            </div>

            <div className={styles["filter-form-col-left"]}>
                <label>
                    <span>Ordina per</span>
                </label>
            </div>
            <div className={styles["filter-form-col-right"]}>
                <SelectOrder handleForm={handleForm} />
            </div>
        </form>
    );
}

function SelectCat({ handleForm, categories }) {
    // console.log("FilterForm Select: ", defaultValue);
    return (
        <select name="category" id="category" onChange={(e) => handleForm(e)}>
            <option value="" label="--Tutte"></option>
            {categories &&
                categories.map((category) => (
                    <option
                        key={category}
                        value={category}
                        label={category}
                    ></option>
                ))}
        </select>
    );
}

function SelectOrder({ handleForm }) {
    return (
        <select name="order" id="order" onChange={(e) => handleForm(e)}>
            <option value="new">Novitá</option>
            {/* <option value="relevant">Rilevanza --?</option> */}
            <option value="asc">Ordine alfabetico A-Z</option>
            <option value="desc">Ordine alfabetico Z-A</option>
            <option value="lowPrice">Prezzo piú basso</option>
            <option value="highPrice">Prezzo piú alto</option>
        </select>
    );
}
