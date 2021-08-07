import { useState, useEffect } from "react";
import "./style/Filter.css";
import FilterForm from "./FilterForm/FilterForm";

import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    filterByValue,
    filterByCategory,
    sortByPrice,
    filterByPrice,
    sortByAlphabet,
    sortByNew,
} from "../../../redux/FilterStore/filterStore.actions";
const getCategories = (state) => state.loadData.categories;
const getTopValue = (state) => state.loadData.topValue;
const getFilteredItems = (state) => state.filterStore.filteredItems;
const getAppliedFilters = (state) => state.filterStore.appliedFilters;

export default function Filter() {
    let categories = useSelector(getCategories, shallowEqual);
    let topValue = useSelector(getTopValue, shallowEqual);
    let filteredItems = useSelector(getFilteredItems, shallowEqual);
    let appliedFilters = useSelector(getAppliedFilters, shallowEqual);

    const dispatch = useDispatch();

    let research = ""; //forse posso eliminare

    const [priceRange, setPriceRange] = useState({
        min: 0,
        max: Number(topValue) || 10,
    });

    const [filters, setFilters] = useState({
        name: research || "",
        priceMin: priceRange.min,
        priceMax: priceRange.max,
        category: "",
        categoryID: "",
        order: "new",
    }); //forse posso eliminare //non credo

    useEffect(
        () =>
            setPriceRange({
                min: 0,
                max: Number(topValue),
            }),
        [topValue]
    );
    useEffect(
        () => setFilters((prevState) => ({ ...prevState, ...appliedFilters })),
        [appliedFilters]
    );

    //////////////////////////////////////////

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target.form;
        // Price range
        setTimeout(() => {
            if (Number(form[1].value) >= Number(form[2].value)) {
                form[2].value = form[1].value;
            }
            setPriceRange({
                min: Number(form[1].value),
                max: Number(form[2].value),
            });
        }, 3000);

        // Categories ptI
        let selectedCat = categories.find(
            (cat) => cat.animalID === Number(form[3].value)
        );
        !selectedCat
            ? (selectedCat = { category: "", categoryID: "" })
            : (selectedCat = {
                  category: selectedCat.animal,
                  categoryID: selectedCat.animalID,
              });

        // New State
        const data = new FormData(form);
        let allValues = Object.fromEntries(data.entries());

        //Categories ptII
        allValues.category = selectedCat.category;
        allValues.categoryID = selectedCat.categoryID;
        // console.log("handleForm activated", form[4].value);
        // questo value crea bug perché passa solo animalID 🧨
        // preveniamo questo value da cambiare liberamente, questo input value va in conflitto con handleFormCategory // perché utilizzo ricerca category a due fattori

        setFilters((prevState) => ({
            ...prevState,
            ...allValues,
        }));
        // console.log("Number(form[3].value", Number(form[3].value));
        console.log("handleForm activated", allValues);
    };

    //////////////////////////////////////////

    const handleFormOrder = (e) => {
        e.preventDefault();
        const value = e.target.value;

        setFilters((prevState) => ({
            ...prevState,
            order: value,
        }));
        console.log("handleFormOrder activated", value);
    };

    //////////////////////////////////////////

    const handlePriceRange = (value) => setPriceRange(value);
    const handleRangeSlider = () => {
        // console.log("value in handlePriceRange: ", value);
        let minInput = document.querySelector("#priceMin");
        let maxInput = document.querySelector("#priceMax");
        minInput.value = priceRange.min;
        maxInput.value = priceRange.max;
        setFilters((prevState) => ({
            ...prevState,
            priceMin: priceRange.min,
            priceMax: priceRange.max,
        }));
    };

    //////////////////////////////////////////

    useEffect(() => handleFilters(), [filters]);

    const handleFilters = () => {
        console.log("🐸🐸🐸handleFilters activated", filters);
        if (filteredItems && filters) {
            console.log("filters in useEffect[filters]: ", filters);
            dispatch(filterByValue({ value: filters.name.toLowerCase() }));
            dispatch(
                filterByCategory({
                    value: filters.category,
                    valueID: filters.categoryID,
                })
            ); // 🧨 Bug; se cancello lettera con category selezionata scompaiono i risultati

            dispatch(
                filterByPrice({
                    minPrice: filters.priceMin,
                    maxPrice: filters.priceMax,
                })
            );

            switch (filters.order) {
                case "new": {
                    dispatch(sortByNew({ value: filters.order }));
                    break;
                }
                case "asc": {
                    dispatch(sortByAlphabet({ value: filters.order }));
                    break;
                }
                case "desc": {
                    dispatch(sortByAlphabet({ value: filters.order }));
                    break;
                }
                case "lowPrice": {
                    dispatch(sortByPrice({ value: filters.order }));
                    break;
                }
                case "highPrice": {
                    dispatch(sortByPrice({ value: filters.order }));
                    break;
                }

                default:
                    break;
            }
        } else {
            console.log("🐸🐸🐸handleOrder activated but no filters! :(");
        }
    };

    return (
        <div className="filter-wrap">
            <h4>Filters:</h4>
            <FilterForm
                filters={filters}
                categories={categories}
                research={research}
                topValue={Number(topValue)}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                handleForm={handleForm}
                handleFormOrder={handleFormOrder}
                handlePriceRange={handlePriceRange}
                handleRangeSlider={handleRangeSlider}
            />
        </div>
    );
}
