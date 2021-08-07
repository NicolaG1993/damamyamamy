// in questo file esportiamo le varie funzioni da invokare in App
import {
    SETUP_STORE,
    FILTER_BY_VALUE,
    FILTER_BY_CATEGORY,
    FILTER_BY_PRICE,
    SORT_BY_NEW,
    SORT_BY_ALPHABET,
    SORT_BY_PRICE,
} from "./filterStore.types";

export function setupStore() {
    //come ottenere state da un'altro reducer
    //in alternativa si puo semplicemente passare via prop da component
    return (dispatch, getState) => {
        const { data } = getState().loadData;
        dispatch({
            type: SETUP_STORE,
            payload: data,
        });
    };
}

export function filterByValue(payload) {
    return {
        type: FILTER_BY_VALUE,
        payload,
    };
}

export function filterByCategory(payload) {
    return {
        type: FILTER_BY_CATEGORY,
        payload,
    };
}

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

export function sortByNew(payload) {
    return {
        type: SORT_BY_NEW,
        payload,
    };
}
