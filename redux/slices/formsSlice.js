import { createSlice } from "@reduxjs/toolkit";
// import Cookies from "js-cookie";

const initialState = {
    shopFilters: { page: 1 },
};

const formsSlice = createSlice({
    name: "forms",
    initialState,
    reducers: {
        saveShopFilters: (state, action) => {
            state.shopFilters = action.payload;
        },
    },
});

export const { saveShopFilters } = formsSlice.actions; // ACTIONS
export const selectShopFiltersState = (state) => state.forms.shopFilters; // SELECTOR
export default formsSlice;
