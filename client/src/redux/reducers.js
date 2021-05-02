/* eslint-disable indent */

const initialState = {
    appliedFilters: [],
};

const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_VALUE = "FILTER_BY_VALUE";
const FILTER_BY_CATEGORY = "FILTER_BY_CATEGORY";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";
const SORT_BY_NEW = "SORT_BY_NEW";
const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const SORT_BY_PRICE = "SORT_BY_PRICE";
const LOAD_NEW_PAGE = "LOAD_NEW_PAGE";
const LOAD_EXACT_PAGE = "LOAD_EXACT_PAGE";

//separare i vari reducers [load data, cart, filter, order] 🐔
//cé molto codice che si ripete, vedere se si puo unire in fn 🐔

export default function filterStore(state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA: {
            let allStore = action.payload;
            console.log("LOAD_DATA: ", allStore);

            let count = action.payload.length + 1;
            let countPerPage = 9; //We need the total number of pages. This is used in rendering the pagination component. //round up
            let totalPages = Math.ceil(count / countPerPage);

            let topValue = Math.max.apply(
                Math,
                allStore.map(function (o) {
                    return o.price.raw;
                })
            );

            return {
                ...state,
                allStore,
                //all of this is for NavPage component
                filteredProducts: allStore,
                displayedProducts: allStore.slice(0, countPerPage),
                currentCount: countPerPage,
                countPerPage,
                totalCount: count,
                currentPage: 1,
                totalPages: totalPages,
                filteredPages: totalPages,
                highestPrice: topValue,
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
            // console.log("FILTER_BY_VALUE [filteredValues]: ", filteredValues);
            // console.log("FILTER_BY_VALUE [appliedFilters]: ", appliedFilters);
            //if the value from the input box is not empty
            if (value) {
                //check if the filter already exists in the tracking array
                let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                if (index === -1)
                    //if it doesn’t, add it.
                    appliedFilters.push(FILTER_BY_VALUE);
                //change the filtered products to reflect the change
                newState.filteredProducts = filteredValues;
                newState.displayedProducts = newState.filteredProducts.slice(
                    0,
                    state.countPerPage
                );
            } else {
                //if the value is empty, we can assume everything has been erased
                let index = appliedFilters.indexOf(FILTER_BY_VALUE);
                //in that case, remove the current filter
                appliedFilters.splice(index, 1);
                if (appliedFilters.length === 0) {
                    //if there are no filters applied, reset the products to normal.
                    newState.filteredProducts = newState.allStore;
                    newState.displayedProducts = newState.filteredProducts.slice(
                        0,
                        state.countPerPage
                    );
                }
            }

            //all of this is for NavPage component
            let count = newState.filteredProducts.length + 1;
            let totalPages = Math.ceil(count / state.countPerPage);
            newState.totalCount = count;
            (newState.currentCount = state.countPerPage),
                (newState.currentPage = 1);
            newState.totalPages = totalPages;
            newState.filteredPages = totalPages;

            // console.log("FILTER_BY_VALUE newState: ", newState);

            window.history.pushState(
                { page: 1 },
                "title 1",
                `?page=${newState.currentPage}`
            );

            return newState;
        }

        case FILTER_BY_CATEGORY: {
            // console.log("FILTER_BY_CATEGORY: ", state);
            let newState = Object.assign({}, state);
            let value = action.payload.value;
            if (value === "") {
                newState.filteredProducts = state.filteredProducts;
                newState.displayedProducts = newState.filteredProducts.slice(
                    0,
                    state.countPerPage
                );
            } else {
                let filteredValues = state.filteredProducts.filter(
                    (product) => product.categories[0].id === value
                );
                newState.filteredProducts = filteredValues;
                newState.displayedProducts = newState.filteredProducts.slice(
                    0,
                    state.countPerPage
                );
            }

            //all of this is for NavPage component
            let count = newState.filteredProducts.length + 1;
            let totalPages = Math.ceil(count / state.countPerPage);
            newState.totalCount = count;
            newState.currentCount = state.countPerPage;
            newState.currentPage = 1;
            newState.totalPages = totalPages;
            newState.filteredPages = totalPages;

            window.history.pushState(
                { page: 1 },
                "title 1",
                `?page=${newState.currentPage}`
            );

            return newState;
        }

        //devo capire bene come usare newState -> ora se cambio categoria mi torna tutti i prodotti

        case FILTER_BY_PRICE: {
            // console.log("FILTER_BY_PRICE [action.payload", action.payload);
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
                newState.displayedProducts = newState.filteredProducts.slice(
                    0,
                    state.countPerPage
                );
            }

            //all of this is for NavPage component
            let count = newState.filteredProducts.length + 1;
            let totalPages = Math.ceil(count / state.countPerPage);
            newState.totalCount = count;
            newState.currentCount = state.countPerPage;
            newState.currentPage = 1;
            newState.totalPages = totalPages;
            newState.filteredPages = totalPages;

            window.history.pushState(
                { page: 1 },
                "title 1",
                `?page=${newState.currentPage}`
            );

            return newState;
        }

        case SORT_BY_NEW: {
            // console.log("SORT_BY_NEW [action.payload]", action.payload);
            let newState = Object.assign({}, state);

            newState.filteredProducts = sortAsc(
                state.filteredProducts,
                "created"
            );
            newState.displayedProducts = newState.filteredProducts.slice(
                0,
                state.countPerPage
            );
            newState.order = action.payload.value;

            return newState;
        }

        case SORT_BY_ALPHABET: {
            // console.log("SORT_BY_ALPHABET [action.payload]", action.payload);
            let newState = Object.assign({}, state);

            let sortedArr =
                action.payload.value === "asc"
                    ? sortAsc(state.filteredProducts, "name")
                    : sortDesc(state.filteredProducts, "name");

            newState.filteredProducts = sortedArr;
            newState.displayedProducts = newState.filteredProducts.slice(
                0,
                state.countPerPage
            );
            newState.order = action.payload.value;

            return newState;
        }

        case SORT_BY_PRICE: {
            // console.log("SORT_BY_PRICE [action.payload]", action.payload);
            // console.log(
            // "SORT_BY_PRICE [state.filteredProducts]",
            // state.filteredProducts
            // );
            let newState = Object.assign({}, state);

            let sortedArr =
                action.payload.value === "lowPrice"
                    ? sortAsc(state.filteredProducts, "price.raw")
                    : sortDesc(state.filteredProducts, "price.raw");

            newState.filteredProducts = sortedArr;
            newState.displayedProducts = newState.filteredProducts.slice(
                0,
                state.countPerPage
            );
            newState.order = action.payload.value;

            return newState;
        }

        case LOAD_NEW_PAGE: {
            console.log(
                "LOAD_NEW_PAGE [state.filteredProducts]",
                state.filteredProducts
            );
            //Clone the previous state
            let loadNewPageState = Object.assign({}, state);
            //How many pages should be added. Will always be 1 or -1
            let addPages = action.payload.page;
            //add it to the current
            loadNewPageState.currentPage += addPages;

            let perPage = loadNewPageState.countPerPage; //9 by default

            let nextProducts;
            if (addPages === 1) {
                //Moving from page 1 to 2 will cause ‘upperCount’ to be 18
                let upperCount = loadNewPageState.currentCount + perPage;
                let lowerCount = loadNewPageState.currentCount; //This hasn’t been changed. It will remain 20.
                //Now, we change the currentCount to match ‘upperCount.’ It’ll be used as such
                //at any point after this line
                loadNewPageState.currentCount += loadNewPageState.countPerPage;
                //Only retrieve products within the (9,18) range (for page 2)
                nextProducts = state.filteredProducts.slice(
                    lowerCount,
                    upperCount
                );
            }

            if (addPages === -1) {
                //’currentCount’ has changed roles. Now it serves as the upperCount.
                let upperCount = loadNewPageState.currentCount; //18
                let lowerCount = loadNewPageState.currentCount - perPage; //9
                //Then it’s reset. This way, the first if statement will always treat it as the ‘upperCount’
                loadNewPageState.currentCount = lowerCount;
                nextProducts = state.filteredProducts.slice(
                    lowerCount - perPage,
                    upperCount - perPage
                );
            }

            loadNewPageState.displayedProducts = nextProducts;
            window.history.pushState(
                { page: 1 },
                "title 1",
                `?page=${loadNewPageState.currentPage}`
            );
            return loadNewPageState;
        }
        case LOAD_EXACT_PAGE: {
            console.log("LOAD_EXACT_PAGE [action.payload]", action.payload);

            const exactPageState = Object.assign({}, state);
            const exactPage = action.payload.page;
            let upperCountExact = exactPageState.countPerPage * exactPage;
            let lowerCountExact = upperCountExact - exactPageState.countPerPage;

            let exactProducts = exactPageState.filteredProducts.slice(
                lowerCountExact,
                upperCountExact
            );
            exactPageState.displayedProducts = exactProducts;
            exactPageState.currentCount = upperCountExact;
            exactPageState.currentPage = exactPage;
            window.history.pushState(
                { page: 1 },
                "title 1",
                `?page=${exactPageState.currentPage}`
            );

            return exactPageState;
        }

        default:
            return state;
    }
}

function sortAsc(arr, field) {
    return arr.sort(function (a, b) {
        if (get(a, field) > get(b, field)) {
            return 1;
        }
        if (get(b, field) > get(a, field)) {
            return -1;
        }
        return 0;
    });
}
function sortDesc(arr, field) {
    return arr.sort(function (a, b) {
        if (get(a, field) > get(b, field)) {
            return -1;
        }
        if (get(b, field) > get(a, field)) {
            return 1;
        }
        return 0;
    });
}

function get(obj, path, def) {
    //questa funzione serve per passare deep path come stringhe, es: "price.raw"
    function stringToPath(path) {
        // If the path isn't a string, return it
        if (typeof path !== "string") return path;

        // Create new array
        var output = [];

        // Split to an array with dot notation
        path.split(".").forEach(function (item, index) {
            // Split to an array with bracket notation
            item.split(/\[([^}]+)\]/g).forEach(function (key) {
                // Push to the new array
                if (key.length > 0) {
                    output.push(key);
                }
            });
        });

        return output;
    }

    // Get the path as an array
    path = stringToPath(path);

    // Cache the current object
    var current = obj;

    // For each item in the path, dig into the object
    for (var i = 0; i < path.length; i++) {
        // If the item isn't found, return the default (or null)
        if (!current[path[i]]) return def;

        // Otherwise, update the current  value
        current = current[path[i]];
    }

    return current;
}
