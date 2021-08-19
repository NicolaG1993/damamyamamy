/* eslint-disable indent */
import {
    SETUP_STORE,
    FILTER_BY_CATEGORY,
    FILTER_BY_VALUE,
    FILTER_BY_PRICE,
    SORT_BY_NEW,
    SORT_BY_ALPHABET,
    SORT_BY_PRICE,
} from "./filterStore.types";
import { sortArrayAsc, sortArrayDesc } from "../../utils/useSort";

const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case SETUP_STORE: {
            let data = action.payload;
            return {
                ...state,
                appliedFilters: {
                    category: "",
                    categoryID: "",
                    order: "new",
                },
                originalState: data,
                filteredItems: data,
            };
        }

        case FILTER_BY_VALUE: {
            let newState = Object.assign({}, state);
            let { value } = action.payload;
            console.log("FILTER_BY_VALUE: ", value);

            let filteredValues = state.originalState.filter((product) => {
                // NB: io uso originalState perché non mi aspetto di avere troppo data, in quel caso gestire chunk di data via server e usarli come originalState (credo)

                return (
                    product.name.toLowerCase().includes(value) ||
                    (product.categories[0] &&
                        product.categories[0].name
                            .toLowerCase()
                            .includes(value))
                );
            }); //look for objects with the received value in their ‘name’ or category fields

            if (value === "") {
                newState.filteredItems = state.originalState;
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
                ); // NB: io uso originalState
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
                ); // NB: io uso originalState
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
