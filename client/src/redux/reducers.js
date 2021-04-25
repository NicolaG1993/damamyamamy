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

export function reducer(state = {}, action) {
    switch (action.type) {
        case LOAD_DATA:
            let allStore = action.payload.allStore;
            let products = generate(allStore);
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
