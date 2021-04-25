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

const SORT_BY_ALPHABET = "SORT_BY_ALPHABET";
const SORT_BY_PRICE = "SORT_BY_PRICE";
const LOAD_DATA = "LOAD_DATA";
const FILTER_BY_PRICE = "FILTER_BY_PRICE";

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
