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

export function reducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_DATA: {
            let allStore = action.payload.allStore;
            // console.log("LOAD_DATA: ", allStore);

            let count = action.payload.allStore.length + 1;
            let countPerPage = 9; //We need the total number of pages. This is used in rendering the pagination component. //round up
            let totalPages = Math.ceil(count / countPerPage);
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

            function sortNew(arr, field) {
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

            let sortedArr = sortNew(state.filteredProducts, "created");

            return {
                ...state,
                filteredProducts: sortedArr,
            };
        }

        case SORT_BY_ALPHABET: {
            // console.log("SORT_BY_ALPHABET [action.payload]", action.payload);

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
            // console.log("SORT_BY_PRICE [action.payload]", action.payload);
            // console.log(
            // "SORT_BY_PRICE [state.filteredProducts]",
            // state.filteredProducts
            // );

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
