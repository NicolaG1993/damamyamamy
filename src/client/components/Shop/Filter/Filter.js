import { useState, useEffect } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    filterByValue,
    filterByCategory,
    sortByPrice,
    filterByPrice,
    sortByAlphabet,
    sortByNew,
} from "../../../redux/ShopData/shopData.actions";
const getCategories = (state) => state.shopData.categories;
const getTopValue = (state) => state.shopData.topValue;
// const getFilteredItems = (state) => state.shopData.filteredItems;
// const getAppliedFilters = (state) => state.shopData.appliedFilters;

import HamburgerButton from "./HamburgerButton/HamburgerButton";
import FilterForm from "./FilterForm/FilterForm";
import "./style/Filter.css";

export default function Filter({ research }) {
    //TOGGLE FILTER BAR
    const [filtersBar, setFiltersBar] = useState(false);
    const toggleBar = async () => {
        setFiltersBar(!filtersBar);
    };

    //REDUX
    let categories = useSelector(getCategories, shallowEqual);
    let topValue = useSelector(getTopValue, shallowEqual);
    const dispatch = useDispatch();
    // let filteredItems = useSelector(getFilteredItems, shallowEqual);
    // let appliedFilters = useSelector(getAppliedFilters, shallowEqual);

    //COMPONENT STATE
    const [filters, setFilters] = useState();

    //HOOKS
    useEffect(
        () =>
            topValue &&
            setFilters({
                name: research || "",
                priceMin: 0,
                priceMax: topValue,
                category: "",
                categoryID: "",
                order: "new",
            }),
        [topValue]
    );

    useEffect(() => filters && handleFilters(), [filters]);

    //FUNCTIONS

    const handleFilters = () => {
        console.log("🐸🐸🐸handleFilters activated", filters);

        dispatch(filterByValue({ value: filters.name.toLowerCase() }));

        dispatch(
            filterByCategory({
                value: filters.category,
                valueID: filters.categoryID,
            })
        );
        // 🧨 Bug; se cancello lettera con category selezionata scompaiono i risultati

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
    };

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target.form;

        // New State
        const data = new FormData(form);
        let allValues = Object.fromEntries(data.entries());

        // Category
        let selectedCat = categories.find((cat) => cat.id === form[3].value);
        !selectedCat
            ? (allValues = { ...allValues, category: "", categoryID: "" })
            : (allValues = {
                  ...allValues,
                  category: selectedCat.name,
                  categoryID: selectedCat.id,
              });

        // Price range
        if (Number(form[1].value) <= Number(form[2].value)) {
            console.log("🎃🎃🎃handleForm activated - tutto ok", allValues);
            setFilters(allValues);
        }
    };

    const handleInputRange = (value) =>
        setFilters((filters) => ({
            ...filters,
            priceMin: value.min,
            priceMax: value.max,
        }));

    return (
        <div
            className={`filter-wrap ${
                filtersBar ? "filter-wrap-active" : "filter-wrap-inactive"
            }`}
        >
            <div className="filter-wrap-header" onClick={toggleBar}>
                <h3>Filtra risultati</h3>
                <HamburgerButton
                    navIsActive={filtersBar}
                    toggleNav={toggleBar}
                />
            </div>
            {filters ? (
                <FilterForm
                    categories={categories}
                    filters={filters}
                    topValue={topValue}
                    research={filters.name}
                    handleForm={handleForm}
                    handleInputRange={handleInputRange}
                    filtersBar={filtersBar}
                />
            ) : (
                <div>Caricamento...</div>
            )}
        </div>
    );
}
