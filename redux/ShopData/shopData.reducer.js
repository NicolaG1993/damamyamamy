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
import { sortArrayAsc, sortArrayDesc } from "../../shared/utils/useSort";

const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        /////////////////// from LoadData ///////////////////
        case SETUP_SHOP: {
            let data = action.payload.products;
            let categories = action.payload.categories;
            console.log("SETUP_SHOP: ", action.payload);

            if (data && categories) {
                let topValue = Math.max.apply(
                    Math,
                    data.map(function (el) {
                        return el.price;
                    })
                );

                return {
                    ...state,
                    data,
                    filteredItems: data,
                    categories,
                    topValue,
                };
            } else {
                return state;
            }
        }

        // case FETCH_CATEGORIES: {
        //     console.log("FETCH_CATEGORIES: ", action.payload);
        //     let categories = action.payload;

        //     if (categories) {
        //         return {
        //             ...state,
        //             categories,
        //         };
        //     } else {
        //         return state;
        //     }
        // }

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

        // case FETCH_HIGHEST_VALUE: {
        //     let { data } = state;
        //     // console.log("FETCH_HIGHEST_VALUE data: ", data);
        //     let topValue;
        //     data
        //         ? (topValue = Math.max.apply(
        //               Math,
        //               data.map(function (element) {
        //                   return element.price.raw; // FIXARE ? 🧨
        //               })
        //           ))
        //         : (topValue = undefined);

        //     console.log("FETCH_HIGHEST_VALUE topValue: ", topValue);

        //     return {
        //         ...state,
        //         topValue,
        //     };
        // }

        /////////////////// from filterStore ///////////////////

        case FILTER_BY_VALUE: {
            let { value } = action.payload;
            console.log("FILTER_BY_VALUE: ", value);

            let filteredItems;

            if (value === "") {
                filteredItems = state.data;
            } else {
                filteredItems = state.data.filter((product) => {
                    return (
                        product.name.toLowerCase().includes(value) ||
                        (product.categories[0] &&
                            product.categories[0].name
                                .toLowerCase()
                                .includes(value))
                    );
                }); //look for objects with the received value in their ‘name’ or category fields //add here more fields in case we want to check them
            }

            return { ...state, filteredItems: filteredItems };
        }

        case FILTER_BY_CATEGORY: {
            let value = action.payload.value;
            let valueID = action.payload.valueID;
            console.log("FILTER_BY_CATEGORY: ", value);

            let filteredItems;

            if (value === "") {
                filteredItems = state.filteredItems;
            } else {
                filteredItems = state.filteredItems.filter(
                    (item) =>
                        item.categories[0] &&
                        item.categories[0].name === value &&
                        item.categories[0].id === valueID
                ); // NB: io uso state.data
            }

            return { ...state, filteredItems: filteredItems };
        }

        case FILTER_BY_PRICE: {
            let minPrice = action.payload.minPrice;
            let maxPrice = action.payload.maxPrice;
            console.log("FILTER_BY_PRICE: ", minPrice, maxPrice);

            let filteredItems;

            filteredItems = state.filteredItems.filter(
                (product) =>
                    product.price.raw >= minPrice &&
                    product.price.raw <= maxPrice
            ); // NB: io uso state.data

            return { ...state, filteredItems: filteredItems };
        }

        case SORT_BY_NEW: {
            let sortedArr = sortArrayDesc(state.filteredItems, "created");

            return { ...state, filteredItems: sortedArr };
        }

        case SORT_BY_ALPHABET: {
            let sortedArr =
                action.payload.value === "asc"
                    ? sortArrayAsc(state.filteredItems, "name")
                    : sortArrayDesc(state.filteredItems, "name");

            return { ...state, filteredItems: sortedArr };
        }

        case SORT_BY_PRICE: {
            let sortedArr =
                action.payload.value === "lowPrice"
                    ? sortArrayAsc(state.filteredItems, "price.raw")
                    : sortArrayDesc(state.filteredItems, "price.raw");

            return { ...state, filteredItems: sortedArr };
        }

        default:
            return state;
    }
}
