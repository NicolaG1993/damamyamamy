const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const SORT_BY_PRICE = "SORT_BY_PRICE";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";

export const sortByPrice = (payload) => ({
    type: SORT_BY_PRICE,
    payload,
});
export const filterByPrice = (payload) => ({
    type: FILTER_BY_PRICE,
    payload,
});
export const sortByAlphabet = (payload) => ({
    type: SORT_BY_ALPHABET,
    payload,
});
export const loadData = (payload) => ({
    type: LOAD_DATA,
    payload,
});

export function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_DATA:
            let allStore = action.payload.allStore;

            console.log("LOAD_DATA: ", allStore);
            return {
                ...state,
                products,
            };
        case SORT_BY_ALPHABET:
            //sort alphabetically
            return state;
        case SORT_BY_PRICE:
            //sort by price
            return state;
        case FILTER_BY_PRICE:
            //filter by price
            return state;
        default:
            return state;
    }
}
