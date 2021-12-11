/*
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

export function checkCart(payload) {
    return (dispatch) =>
        getSomeAsyncLogic(
            dispatch,
            commerce.checkout.checkQuantity(
                payload.checkoutTokenId,
                payload.lineItemId,
                {
                    amount: payload.requestedQuantity,
                }
            )
        );

    // commerce.checkout
    //     .checkQuantity(payload.checkoutTokenId, payload.lineItemId, {
    //         amount: payload.requestedQuantity,
    //     })
    //     .then((response) => {
    //         console.log("checkAvailability", response.available);
    //         if (response.available === false) {
    //             removeFromCart({ productId: payload.lineItemId });
    //         }
    //     });
}

async function getSomeAsyncData(dispatch, url, type) {
    // console.log(`👮‍♀️👮‍♂️👮‍♀️: `, type);
    // console.log(`😎😋😋url in ${type}: `, url);
    try {
        const data = await url;
        console.log(`😎😋😋data in ${type}: `, data);
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

async function getSomeAsyncLogic(dispatch, url) {
    url.then((response) => {
        console.log("response.available", response);
        if (response.available === false) {
            console.log(
                "🐲 response.available is false!",
                response.line_item_id
            );
            () =>
                dispatch(removeFromCart({ productId: response.line_item_id }));
        }
        if (response.available === true) {
            console.log(
                "🐲 response.available is true!",
                response.line_item_id
            );
        }
    });
} //portare questa logica in Checkout component ?

//sembra funzionare ma se manca un articolo svuota tutto il carrello per qualche motivo
//potrebbe essere qualche useEffect o reduxSelector?
*/

import {
    CART_ADD_ITEM,
    CART_REMOVE_ITEM,
    CART_CLEAR,
    SAVE_SHIPPING_ADDRESS,
    SAVE_PAYMENT_METHOD,
} from "./cart.types";

export function cartAddItem(payload) {
    return {
        type: CART_ADD_ITEM,
        payload,
    };
}
export function cartRemoveItem(payload) {
    return {
        type: CART_REMOVE_ITEM,
        payload,
    };
}
export function cartClear() {
    return {
        type: CART_CLEAR,
    };
}
export function saveShippingAddress(payload) {
    return {
        type: SAVE_SHIPPING_ADDRESS,
        payload,
    };
}
export function savePaymentMethod(payload) {
    return {
        type: SAVE_PAYMENT_METHOD,
        payload,
    };
}
