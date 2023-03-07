import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = {
    cart: Cookies.get("cart") ? JSON.parse(Cookies.get("cart")) : [],
    shippingAddress: Cookies.get("shippingAddress")
        ? JSON.parse(Cookies.get("shippingAddress"))
        : {},
    paymentMethod: Cookies.get("paymentMethod")
        ? Cookies.get("paymentMethod")
        : "",
};

const in1Hour = new Date(new Date().getTime() + 60 * 60 * 1000);

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;

            const cartItem = state.cart.find(({ id }) => id === item.id);

            // we replace item in cart if existing, not update quantity
            const cart = cartItem
                ? state.cart.map((el) => (el.id === item.id ? item : el))
                : [...state.cart, item];
            Cookies.set("cart", JSON.stringify(cart), {
                expires: in1Hour,
            });
            state.cart = cart;
        },
        removeFromCart: (state, action) => {
            const itemID = action.payload;
            const cart = state.cart.filter(({ id }) => id !== itemID);
            Cookies.set("cart", JSON.stringify(cart), {
                expires: in1Hour,
            });
            state.cart = cart;
        },
        updateCart: (state, action) => {
            const cart = action.payload;
            let parsedCart = cart.map(({ id, quantity }) => ({
                id,
                quantity,
            }));
            Cookies.set("cart", JSON.stringify(parsedCart), {
                expires: in1Hour,
            });
            state.cart = parsedCart;
        },
        emptyCart: (state) => {
            Cookies.set("cart", JSON.stringify([]), {
                expires: in1Hour,
            });
            state.cart = [];
        },
        saveShippingAddress: (state, action) => {
            Cookies.set("shippingAddress", JSON.stringify(action.payload), {
                expires: in1Hour,
            });
            state.shippingAddress = action.payload;
        },
        savePaymentMethod: (state, action) => {
            Cookies.set("paymentMethod", action.payload);
            state.paymentMethod = action.payload;
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    updateCart,
    emptyCart,
    saveShippingAddress,
    savePaymentMethod,
} = cartSlice.actions; // ACTIONS
export const selectCartState = (state) => state.cart; // SELECTOR
export default cartSlice; // REDUCER
