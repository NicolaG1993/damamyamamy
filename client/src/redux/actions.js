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

export function loadData(payload) {
    return {
        type: "LOAD_DATA",
        payload,
    };
}

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
