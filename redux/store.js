// 🧠 posso disinstallare: redux redux-thunk redux-devtools-extension next-redux-wrapper ???

import { configureStore } from "@reduxjs/toolkit";
// import { createWrapper } from "next-redux-wrapper";

// create a slice
import cartSlice from "./slices/cartSlice";
import formsSlice from "./slices/formsSlice";
import uiSlice from "./slices/uiSlice";
import userSlice from "./slices/userSlice";

// config the store
const store = configureStore({
    reducer: {
        cart: cartSlice.reducer,
        forms: formsSlice.reducer,
        ui: uiSlice.reducer,
        user: userSlice.reducer,
    },
    devTools: true,
});

export default store;
