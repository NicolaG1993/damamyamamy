// import { createStore, applyMiddleware } from "redux";
// import thunk from "redux-thunk"; // posso disinstallare questo
// import { composeWithDevTools } from "redux-devtools-extension"; // posso disinstallare questo ?
// import rootReducer from "./rootReducer";

// const store = createStore(
//     rootReducer,
//     composeWithDevTools(applyMiddleware(thunk))
// );

// const store = configureStore();

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import userSlice from "./slices/userSlice";

// create a slice
// export const userSlice = createSlice({
//     name: "user",
//     initialState: {
//         user: null,
//     },
//     reducers: {
//         // ...
//     },
// });

// config the store
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        // cart: cartSlice.reducer,
    },
    devTools: true,
});

// export the store
// const wrapper = createWrapper(store);
// export default wrapper;
export default store;

// export the action
// export const iconAction = iconslice.actions;
