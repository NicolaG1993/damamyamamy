import {
    LOAD_DATA,
    FETCH_CATEGORIES,
    FETCH_SPECIFIC_CATEGORIES,
    FETCH_HIGHEST_VALUE,
    GET_ITEM,
} from "./loadData.types";

import { commerce } from "../../lib/commerce"; // importa axios, api, ...

// Molte delle funzioni che fará il reducer si potranno eliminare se si lavora con server o api, vedi sotto
export function loadData() {
    return (dispatch) => {
        dispatch({
            type: LOAD_DATA,
        });
        getSomeAsyncData(dispatch, commerce.products.list(), LOAD_DATA);
    };
} // This is how we do async actions with redux-thunk

export function fetchCategories() {
    return (dispatch) => {
        dispatch({
            type: FETCH_CATEGORIES,
        });
        getSomeAsyncData(
            dispatch,
            commerce.categories.list(),
            FETCH_CATEGORIES
        );
    };
} // This is how we do async actions with redux-thunk

async function getSomeAsyncData(dispatch, url, type) {
    try {
        const { data } = await url;

        dispatch({
            type: type,
            payload: data,
        });
    } catch (err) {
        console.log(`err in ${type} action: `, err);
    }
}

export function fetchSpecificCategories() {
    return {
        type: FETCH_SPECIFIC_CATEGORIES,
    };
}
export function fetchHighestValue() {
    return {
        type: FETCH_HIGHEST_VALUE,
    };
}
export function getItem(payload) {
    return {
        type: GET_ITEM,
        payload,
    }; // una cosa come questa é meglio farla via request server side se possibile
}
