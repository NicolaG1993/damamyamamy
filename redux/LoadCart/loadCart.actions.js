import {
    FETCH_CART,
    HANDLE_CART,
    HANDLE_NEW_CART,
    HANDLE_ERROR,
} from "./loadCart.types";

import { commerce } from "../../shared/libs/commerce";

export function fetchCart() {
    return (dispatch) => {
        dispatch({
            type: FETCH_CART,
        });
        getSomeAsyncData(dispatch, commerce.cart.retrieve(), FETCH_CART);
    };
}
export function addToCart(payload) {
    return (dispatch) =>
        getSomeAsyncData(
            dispatch,
            commerce.cart.add(payload.productId, payload.quantity),
            HANDLE_CART
        );
}
export function removeFromCart(payload) {
    return (dispatch) =>
        getSomeAsyncData(
            dispatch,
            commerce.cart.remove(payload.productId),
            HANDLE_CART
        );
}
export function emptyCart() {
    return (dispatch) =>
        getSomeAsyncData(dispatch, commerce.cart.empty(), HANDLE_CART);
}
export function refreshCart() {
    return (dispatch) =>
        getSomeAsyncData(dispatch, commerce.cart.refresh(), HANDLE_NEW_CART);
}

async function getSomeAsyncData(dispatch, url, type) {
    // console.log(`👮‍♀️👮‍♂️👮‍♀️: `, type);
    // console.log(`😎😋😋url in ${type}: `, url);
    try {
        const data = await url;
        // console.log(`😎😋😋data in ${type}: `, data);
        dispatch({
            type: type,
            payload: data,
        });
    } catch (err) {
        console.log(`err in ${type} action: `, err);
        dispatch({
            type: HANDLE_ERROR,
            payload: { actionType: type, error: err },
        });
    }
}
