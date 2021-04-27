/* eslint-disable indent */
// export function reducer(state = {}, action) {}

// const initialState = {};
// const filterStore = (state = initialState, action) => {
//     switch (action.type) {
//                     case SORT_BY_ALPHABET:
//                         //sort alphabetically
//                         return state;
//                     case SORT_BY_PRICE:
//                         //sort by price
//                         return state;
//                     case FILTER_BY_PRICE:
//                         //filter by price
//                         return state;
//                     case LOAD_DATA:
//                         let allStore = action.payload.allStore;
//                         let products = generate(allStore);
//                         console.log("LOAD_DATA: ", allStore);
//                         return {
//                             ...state,
//                             products,
//                         };
//                     default:
//                         return state;
//     }
// };
// export default filterStore;

const initialState = {
    appliedFilters: [],
};

const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";
const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const SORT_BY_PRICE = "SORT_BY_PRICE";

export function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA: {
            let allStore = action.payload.allStore;
            console.log("LOAD_DATA: ", allStore);
            return {
                ...state,
                allStore,
            };
        }

        case FILTER_BY_VALUE: {
            //clone the state
            let newState = Object.assign({}, state);
            //the value received from our component
            let value = action.payload.value;
            let filteredValues = state.allStore.filter((product) => {
                //look for objects with the received value in their ‘name’ or ‘categories’ fields
                return (
                    product.name.toLowerCase().includes(value) ||
                    product.categories[0].name.toLowerCase().includes(value)
                );
            });
            let appliedFilters = state.appliedFilters;
            console.log("FILTER_BY_VALUE [filteredValues]: ", filteredValues);
            console.log("FILTER_BY_VALUE [appliedFilters]: ", appliedFilters);
            //if the value from the input box is not empty
            if (value) {
                //check if the filter already exists in the tracking array
                let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                if (index === -1)
                    //if it doesn’t, add it.
                    appliedFilters.push(FILTER_BY_VALUE);
                //change the filtered products to reflect the change
                newState.filteredProducts = filteredValues;
            } else {
                //if the value is empty, we can assume everything has been erased
                let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                //in that case, remove the current filter
                appliedFilters.splice(index, 1);
                if (appliedFilters.length === 0) {
                    //if there are no filters applied, reset the products to normal.
                    newState.filteredProducts = newState.allStore;
                }
            }

            console.log("FILTER_BY_VALUE newState: ", newState);
            return newState;
        }

        case FILTER_BY_CATEGORY: {
            console.log("FILTER_BY_CATEGORY: ", state);
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            if (value === "") {
                newState.filteredProducts = state.filteredProducts;
            } else {
                let filteredValues = state.filteredProducts.filter(
                    (product) => product.categories[0].id === value
                );
                newState.filteredProducts = filteredValues;
            }
            return newState;
        }

        //devo capire bene come usare newState -> ora se cambio categoria mi torna tutti i prodotti

        case FILTER_BY_PRICE: {
            console.log("FILTER_BY_PRICE [action.payload", action.payload);
            let newState = Object.assign({}, state);
            let minPrice = action.payload.minPrice;
            let maxPrice = action.payload.maxPrice;
            if (minPrice || maxPrice) {
                let filteredValues = state.filteredProducts.filter(
                    (product) =>
                        product.price.raw >= minPrice &&
                        product.price.raw <= maxPrice
                );
                newState.filteredProducts = filteredValues;
            }
            return newState;
        }

        case SORT_BY_ALPHABET: {
            console.log("SORT_BY_ALPHABET [action.payload]", action.payload);

            function sortAsc(arr, field) {
                return arr.sort(function (a, b) {
                    if (a[field] > b[field]) {
                        return 1;
                    }
                    if (b[field] > a[field]) {
                        return -1;
                    }
                    return 0;
                });
            }
            function sortDesc(arr, field) {
                return arr.sort(function (a, b) {
                    if (a[field] > b[field]) {
                        return -1;
                    }
                    if (b[field] > a[field]) {
                        return 1;
                    }
                    return 0;
                });
            }

            let sortedArr =
                action.payload.value === "asc"
                    ? sortAsc(state.filteredProducts, "name")
                    : sortDesc(state.filteredProducts, "name");

            return {
                ...state,
                filteredProducts: sortedArr,
            };
        }

        case SORT_BY_PRICE: {
            console.log("SORT_BY_PRICE [action.payload]", action.payload);
            console.log(
                "SORT_BY_PRICE [state.filteredProducts]",
                state.filteredProducts
            );

            function sortLowPrice(arr, field) {
                return arr.sort(function (a, b) {
                    if (a[field].raw > b[field].raw) {
                        return 1;
                    }
                    if (b[field].raw > a[field].raw) {
                        return -1;
                    }
                    return 0;
                });
            }
            function sortHighPrice(arr, field) {
                return arr.sort(function (a, b) {
                    if (a[field].raw > b[field].raw) {
                        return -1;
                    }
                    if (b[field].raw > a[field].raw) {
                        return 1;
                    }
                    return 0;
                });
            }

            let sortedArr =
                action.payload.value === "lowPrice"
                    ? sortLowPrice(state.filteredProducts, "price")
                    : sortHighPrice(state.filteredProducts, "price");

            return {
                ...state,
                filteredProducts: sortedArr,
            };
        }

        default:
            return state;
    }
}
