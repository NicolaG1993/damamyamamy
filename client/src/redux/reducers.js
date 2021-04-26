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
            //the value received from our presentational component
            let value = action.payload.value;
            let filteredValues = state.allStore.filter((product) => {
                //look for objects with the received value in their ‘name’ or ‘categories’ fields
                return (
                    product.name.toLowerCase().includes(value) ||
                    product.categories[0].name.toLowerCase().includes(value)
                );
            });
            let appliedFilters = state.appliedFilters;
            console.log("FILTER_BY_VALUE: ", filteredValues);
            console.log("FILTER_BY_VALUE: ", appliedFilters);
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

            return newState;
        }

        case FILTER_BY_CATEGORY:
            //filter by category
            return state;
        case FILTER_BY_PRICE:
            //filter by price
            return state;

        case SORT_BY_ALPHABET:
            //sort alphabetically
            return state;
        case SORT_BY_PRICE:
            //sort by price
            return state;

        default:
            return state;
    }
}
