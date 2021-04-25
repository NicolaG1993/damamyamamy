// questo file serve a mostrarmi come fare redux in un singolo file index
// che poi posso importare direttamente cosí "./redux"

const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const SORT_BY_PRICE = "SORT_BY_PRICE";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";

export function sortByPrice(payload) {
    return {
        type: SORT_BY_PRICE,
        payload,
    };
}
export function filterByPrice(payload) {
    return {
        type: FILTER_BY_PRICE,
        payload,
    };
}
export function sortByAlphabet(payload) {
    return {
        type: SORT_BY_ALPHABET,
        payload,
    };
}
export function loadData(payload) {
    return {
        type: LOAD_DATA,
        payload,
    };
}

export function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_DATA:
            let allStore = action.payload.allStore;
            console.log("LOAD_DATA: ", allStore);
            return {
                ...state,
                allStore,
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
