// 🧠 posso disinstallare: redux-thunk redux-devtools-extension next-redux-wrapper ???

import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

// create a slice
import userSlice from "./slices/userSlice";
import cartSlice from "./slices/cartSlice";

// config the store
const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        cart: cartSlice.reducer,
    },
    devTools: true,
});

export default store;
