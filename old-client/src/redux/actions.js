// export async function getSmth() {
//     try {
//         const { data } = await axios.get("/api/get-followers");

//         console.log("data in getSmth(actions): ", data);

//         return {
//             type: "GET_FOLLOWERS",
//             payload: data.rows,
//             userId: data.userId,
//         };
//     } catch (err) {
//         console.log("err in getSmth(actions): ", err);
//     }
// }

import { commerce } from "../lib/commerce";

export async function loadData() {
    try {
        const { data } = await commerce.products.list();

        // console.log("data in loadData(actions): ", data.rows);

        return {
            type: "LOAD_DATA",
            payload: data,
        };
    } catch (err) {
        console.log("err in loadData(actions): ", err);
    }
}

// export function loadData(payload) {
//     return {
//         type: "LOAD_DATA",
//         payload,
//     };
// }

export function filterByValue(payload) {
    return {
        type: "FILTER_BY_VALUE",
        payload,
    };
}
export function filterByCategory(payload) {
    return {
        type: "FILTER_BY_CATEGORY",
        payload,
    };
}
export function filterByPrice(payload) {
    return {
        type: "FILTER_BY_PRICE",
        payload,
    };
}

export function sortByNew(payload) {
    return {
        type: "SORT_BY_NEW",
        payload,
    };
}
export function sortByAlphabet(payload) {
    return {
        type: "SORT_BY_ALPHABET",
        payload,
    };
}
export function sortByPrice(payload) {
    return {
        type: "SORT_BY_PRICE",
        payload,
    };
}

export function loadNewPage(payload) {
    return {
        type: "LOAD_NEW_PAGE",
        payload,
    };
}
export function loadExactPage(payload) {
    return {
        type: "LOAD_EXACT_PAGE",
        payload,
    };
}
