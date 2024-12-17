import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    layouts: [
        { component: "overlay", status: false },
        { component: "nav", status: false },
        { component: "alert", status: true },
    ],
    // theme: "theme-light",
};

const uiSlice = createSlice({
    name: "ui",
    initialState,
    reducers: {
        toggle: (state, action) => {
            const { layouts } = state;
            const { component } = action.payload;
            const newState = layouts.map((el) =>
                el.component === component
                    ? { component: el.component, status: !el.status }
                    : el
            );
            state.layouts = newState;
        },
        open: (state, action) => {
            const { layouts } = state;
            const { component } = action.payload;
            const newState = layouts.map((el) =>
                el.component === component
                    ? { component: el.component, status: true }
                    : el
            );
            state.layouts = newState;
        },
        close: (state, action) => {
            const { layouts } = state;
            const { component } = action.payload;
            const newState = layouts.map((el) =>
                el.component === component
                    ? { component: el.component, status: false }
                    : el
            );
            state.layouts = newState;
        },
    },
});

export const { toggle, open, close } = uiSlice.actions; // ACTIONS
export const selectLayoutsState = (state) => state.ui.layouts; // SELECTOR
export default uiSlice;
