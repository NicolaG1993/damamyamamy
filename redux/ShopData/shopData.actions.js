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

// import { commerce } from "../../shared/libs/commerce"; // importa axios, api, ...

// Molte delle funzioni che fará il reducer si potranno eliminare se si lavora con server o api, vedi sotto
export function setupShop(payload) {
    return {
        type: SETUP_SHOP,
        payload,
    };
}

/* export function fetchCategories() {
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
} // This is how we do async actions with redux-thunk */

// export function getItem(payload) {
//     // una cosa come questa é meglio farla via request server side se possibile
//     // console.log("😶😶😶😶😶😶", payload.key);
//     let { key } = payload;
//     return (dispatch) => {
//         dispatch({
//             type: GET_ITEM,
//         });
//         getSomeAsyncData(dispatch, commerce.products.retrieve(key), GET_ITEM);
//     };
// }

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

// utilities //
// async function getSomeAsyncData(dispatch, url, type) {
//     if (type === GET_ITEM) {
//         url.then((data) =>
//             dispatch({
//                 type: type,
//                 payload: data,
//             })
//         ).catch((err) => console.log(`err in ${type} action: `, err));
//     } else {
//         url.then(({ data }) =>
//             dispatch({
//                 type: type,
//                 payload: data,
//             })
//         ).catch((err) => console.log(`err in ${type} action: `, err));
//     }
// }
