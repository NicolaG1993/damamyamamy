/* eslint-disable indent */
import {
    FETCH_DATA,
    FETCH_CATEGORIES,
    FETCH_SPECIFIC_CATEGORIES,
    FETCH_HIGHEST_VALUE,
    GET_ITEM,
    SETUP_SHOP,
    FILTER_BY_CATEGORY,
    FILTER_BY_VALUE,
    FILTER_BY_PRICE,
    SORT_BY_NEW,
    SORT_BY_ALPHABET,
    SORT_BY_PRICE,
} from "./shopData.types";
import { sortArrayAsc, sortArrayDesc } from "../../utils/useSort";

const INITIAL_STATE = {
    data: [],
    categories: [],
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        /////////////////// from LoadData ///////////////////
        case FETCH_DATA: {
            let data = action.payload;
            console.log("FETCH_DATA: ", action.payload);

            if (data) {
                return {
                    ...state,
                    data,
                    filteredItems: data,
                };
            } else {
                return state;
            }
        }

        case FETCH_CATEGORIES: {
            console.log("FETCH_CATEGORIES: ", action.payload);
            let categories = action.payload;

            if (categories) {
                return {
                    ...state,
                    categories,
                };
            } else {
                return state;
            }
        }

        case FETCH_SPECIFIC_CATEGORIES: {
            let { data } = state;
            // console.log("FETCH_SPECIFIC_CATEGORIES: ", data);

            let catNewItems = data ? sortArrayDesc(data, "created") : [];
            let cat1 =
                data &&
                data.filter(
                    (product) =>
                        product.categories[0] &&
                        product.categories[0].slug === "giochi"
                );
            let cat2 =
                data &&
                data.filter(
                    (product) =>
                        product.categories[0] &&
                        product.categories[0].slug === "passeggini-e-trasporto"
                ); // FIXARE? 🧨

            console.log("FETCH_SPECIFIC_CATEGORIES: ", {
                catNewItems,
                cat1,
                cat2,
            });
            return {
                ...state,
                catNewItems,
                cat1,
                cat2,
            };
        }

        case GET_ITEM: {
            let selectedItem = action.payload;
            // let key = Number(action.payload.key);
            // let selectedItem = data.find((item) => item.id === key); // FIXARE ? 🧨
            console.log("GET_ITEM: ", action);
            return {
                ...state,
                selectedItem,
            };
        }

        case FETCH_HIGHEST_VALUE: {
            let { data } = state;
            // console.log("FETCH_HIGHEST_VALUE data: ", data);
            let topValue;
            data
                ? (topValue = Math.max.apply(
                      Math,
                      data.map(function (element) {
                          return element.price.raw; // FIXARE ? 🧨
                      })
                  ))
                : (topValue = undefined);

            console.log("FETCH_HIGHEST_VALUE topValue: ", topValue);

            return {
                ...state,
                topValue,
            };
        }

        /////////////////// from filterStore ///////////////////
        case SETUP_SHOP: {
            console.log("SETUP_SHOP: ", state.data);
            return {
                ...state,
                appliedFilters: {
                    category: "",
                    categoryID: "",
                    order: "new",
                },
                filteredItems: state.data,
            };
        } //serve per fare refresh di filteredItems

        case FILTER_BY_VALUE: {
            let newState = Object.assign({}, state);
            let { value } = action.payload;
            console.log("FILTER_BY_VALUE: ", value);

            let filteredValues = state.data.filter((product) => {
                return (
                    product.name.toLowerCase().includes(value) ||
                    (product.categories[0] &&
                        product.categories[0].name
                            .toLowerCase()
                            .includes(value))
                );
            }); //look for objects with the received value in their ‘name’ or category fields

            if (value === "") {
                newState.filteredItems = state.data;
            } else {
                newState.filteredItems = filteredValues;
            }

            newState.appliedFilters = {
                ...state.appliedFilters,
                name: value,
            };

            return newState;
        }

        case FILTER_BY_CATEGORY: {
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            let valueID = action.payload.valueID;
            console.log("FILTER_BY_CATEGORY", state.filteredItems);

            if (value === "") {
                newState.filteredItems = state.filteredItems;
            } else {
                newState.filteredItems = state.filteredItems.filter(
                    (item) =>
                        item.categories[0] &&
                        item.categories[0].name === value &&
                        item.categories[0].id === valueID
                ); // NB: io uso state.data
            }
            newState.appliedFilters = {
                ...state.appliedFilters,
                category: value,
                categoryID: valueID,
            };
            //Filter deve impostare i filtri
            //Li passa qua e viene filtrato state
            //State viene passato da comp? /o preso da redux state direttamente?
            //Salvare il nuovo state e usarlo in ItemsList

            // console.log("FILTER_BY_CATEGORY", newState);

            return newState;
        }

        case FILTER_BY_PRICE: {
            let newState = Object.assign({}, state);
            let minPrice = action.payload.minPrice;
            let maxPrice = action.payload.maxPrice;

            if (minPrice || maxPrice) {
                let filteredValues = state.filteredItems.filter(
                    (product) =>
                        product.price.raw >= minPrice &&
                        product.price.raw <= maxPrice
                ); // NB: io uso state.data
                newState.filteredItems = filteredValues;
                // newState.appliedFilters = {
                //     ...state.appliedFilters,
                //     priceMin: minPrice,
                //     priceMax: maxPrice,
                // };
            }

            return newState;
        }

        case SORT_BY_NEW: {
            let newState = Object.assign({}, state);
            newState.filteredItems = sortArrayDesc(
                state.filteredItems,
                "created"
            );

            newState.appliedFilters = {
                ...state.appliedFilters,
                order: action.payload.value,
            };

            return newState;
        }

        case SORT_BY_ALPHABET: {
            let newState = Object.assign({}, state);
            let sortedArr =
                action.payload.value === "asc"
                    ? sortArrayAsc(state.filteredItems, "name")
                    : sortArrayDesc(state.filteredItems, "name");

            newState.filteredItems = sortedArr;
            newState.appliedFilters = {
                ...state.appliedFilters,
                order: action.payload.value,
            };

            return newState;
        }

        case SORT_BY_PRICE: {
            console.log("SORT_BY_PRICE: ", state);
            let { value } = action.payload;
            let newState = Object.assign({}, state);

            let sortedArr =
                value === "lowPrice"
                    ? sortArrayAsc(state.filteredItems, "price.raw")
                    : sortArrayDesc(state.filteredItems, "price.raw");

            newState.filteredItems = sortedArr;
            newState.appliedFilters = {
                ...state.appliedFilters,
                order: value,
            };

            let updatedState = { ...newState };

            return updatedState;
        }

        default:
            return state;
    }
}
