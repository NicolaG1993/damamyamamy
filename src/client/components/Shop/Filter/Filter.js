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
import { fetchHighestValue } from "../../../redux/LoadData/loadData.actions";
import HamburgerButton from "./HamburgerButton/HamburgerButton";
const getCategories = (state) => state.loadData.categories;
const getTopValue = (state) => state.loadData.topValue;
const getFilteredItems = (state) => state.filterStore.filteredItems;
const getAppliedFilters = (state) => state.filterStore.appliedFilters;

export default function Filter({ research }) {
    //TOGGLE FILTER BAR
    const [filtersBar, setFiltersBar] = useState(false);
    const toggleBar = async () => {
        setFiltersBar(!filtersBar);
    };

    //REDUX
    let categories = useSelector(getCategories, shallowEqual);
    let topValue = useSelector(getTopValue, shallowEqual);
    let filteredItems = useSelector(getFilteredItems, shallowEqual);
    let appliedFilters = useSelector(getAppliedFilters, shallowEqual);

    const dispatch = useDispatch();
    useEffect(() => categories && dispatch(fetchHighestValue()), [categories]);

    //FILTERS STATE
    const [priceRange, setPriceRange] = useState({
        min: 0,
        max: Number(topValue) || 10,
    }); //questo é il range, non il valore degli input (solo iniziale se mai)
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
    useEffect(() => {
        console.log("🐲🐲🐲");
        setFilters((prevState) => ({ ...prevState, ...appliedFilters }));
    }, [appliedFilters]);

    ////////////////////////////////////////////HANDLE FORM

    const handleForm = (e) => {
        // console.log("handleForm activated 🏰🏰🛸");
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
        // console.log("🐢🐔✔: ", form[3].value);
        let selectedCat = categories.find((cat) => cat.id === form[3].value);
        !selectedCat
            ? (selectedCat = { category: "", categoryID: "" })
            : (selectedCat = {
                  category: selectedCat.name,
                  categoryID: selectedCat.id,
              });

        // New State
        const data = new FormData(form);
        let allValues = Object.fromEntries(data.entries());

        //Categories ptII
        allValues.category = selectedCat.category;
        allValues.categoryID = selectedCat.categoryID;
        // console.log("handleForm activated", form[4].value);
        // questo value crea bug perché passa solo categoryID 🧨
        // preveniamo questo value da cambiare liberamente, questo input value va in conflitto con handleFormCategory // perché utilizzo ricerca category a due fattori

        setFilters((prevState) => ({
            ...prevState,
            ...allValues,
        }));
        // console.log("Number(form[3].value", Number(form[3].value));
        console.log("handleForm activated", allValues);
    };

    const handleFormOrder = (e) => {
        e.preventDefault();
        const value = e.target.value;

        setFilters((prevState) => ({
            ...prevState,
            order: value,
        }));
        console.log("handleFormOrder activated", value);
    };

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

    ////////////////////////////////////////////HANDLE FILTERS

    useEffect(() => handleFilters(), [filters]);

    const handleFilters = () => {
        if (filteredItems && filters) {
            // console.log("🐸🐸🐸handleFilters activated", filters);
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
            console.log(
                "🐸🐸🐸handleFilters activated but no filters! 🤔",
                filters
            );
            return;
        }
    };

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
            {topValue && (
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
                    filtersBar={filtersBar}
                />
            )}
        </div>
    );
}
