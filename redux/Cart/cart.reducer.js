/* eslint-disable indent */

/*
import {
    FETCH_CART,
    HANDLE_CART,
    HANDLE_NEW_CART,
    HANDLE_ERROR,
} from "./loadCart.types";

// const INITIAL_STATE = { notAvailables: [] };
const INITIAL_STATE = {
    cart: {
        cartItems: Cookies.get("cartItems")
            ? JSON.parse(Cookies.get("cartItems"))
            : [],
        shippingAddress: Cookies.get("shippingAddress")
            ? JSON.parse(Cookies.get("shippingAddress"))
            : {},
        paymentMethod: Cookies.get("paymentMethod")
            ? Cookies.get("paymentMethod")
            : "",
    },
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_CART: {
            let cart = action.payload;
            // console.log("FETCH_CART: ", action.payload);

            const addedItems =
                cart &&
                cart.line_items.map((obj) => ({
                    item_id: obj.id,
                    product_id: obj.product_id,
                })); //forse posso evitarla questa essendo giá in cart

            return {
                ...state,
                cart: cart,
                notAvailables: addedItems,
            };
        }

        case HANDLE_CART: {
            let { cart } = action.payload;
            // console.log("HANDLE_CART cart: ", cart);

            let addedItems;
            if (cart) {
                addedItems = cart.line_items.map((obj) => ({
                    item_id: obj.id,
                    product_id: obj.product_id,
                }));
            }
            //  console.log("HANDLE_CART: ", addedItems);
            return { ...state, cart: cart, notAvailables: addedItems };
        }
        case HANDLE_NEW_CART: {
            let newCart = action.payload;
            // console.log("HANDLE_NEW_CART newCart: ", newCart);
            return { ...state, cart: newCart, notAvailables: [] };
        }

        case HANDLE_ERROR: {
            let { error } = action.payload;
            let { actionType } = action.payload;
            // console.log("HANDLE_ERROR error: ", error);
            // console.log("HANDLE_ERROR action: ", actionType);
            return { ...state, error: { actionType: actionType, err: error } };
        }

        default:
            return state;
    }
}
*/

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_CLEAR,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
} from "./cart.types";
import Cookies from "js-cookie";

const INITIAL_STATE = {
    cartItems: Cookies.get("cartItems")
        ? JSON.parse(Cookies.get("cartItems"))
        : [],
    shippingAddress: Cookies.get("shippingAddress")
        ? JSON.parse(Cookies.get("shippingAddress"))
        : {},
    paymentMethod: Cookies.get("paymentMethod")
        ? Cookies.get("paymentMethod")
        : "",
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case CART_ADD_ITEM: {
            const newItem = action.payload;
            const existItem = state.cartItems.find(
                (item) => item.id === newItem.id
            );
            const cartItems = existItem
                ? state.cartItems.map((item) =>
                      item.name === existItem.name ? newItem : item
                  )
                : [...state.cartItems, newItem];
            Cookies.set("cartItems", JSON.stringify(cartItems));
            return { ...state, cartItems };
        }

        case CART_REMOVE_ITEM: {
            const cartItems = state.cartItems.filter(
                (item) => item.id !== action.payload.id
            );
            Cookies.set("cartItems", JSON.stringify(cartItems));
            return { ...state, cartItems };
        }

        case CART_CLEAR:
            return {
                ...state,
                cartItems: [],
            };

        case SAVE_SHIPPING_ADDRESS:
            return {
                ...state,
                shippingAddress: action.payload,
            };

        case SAVE_PAYMENT_METHOD:
            return {
                ...state,
                paymentMethod: action.payload,
            };

        default:
            return state;
    }
}
