/*
import {
    LOAD_CHECKOUT,
    CAPTURE_CHECKOUT,
    HANDLE_ERROR,
    AUTHORIZE_PP,
} from "./checkout.types";

import { commerce } from "../../shared/libs/commerce";

export function loadCheckout() {
    return {
        type: LOAD_CHECKOUT,
    };
}
// export function authorizePP(payload) {
//     return (dispatch) =>
//         getSomeAsyncData(
//             dispatch,
//             commerce.checkout.capture(
//                 payload.checkoutTokenId,
//                 payload.authOrder
//             ),
//             AUTHORIZE_PP
//         );
// }
export function captureCheckout(payload) {
    return (dispatch) =>
        getSomeAsyncData(
            dispatch,
            commerce.checkout.capture(
                payload.checkoutTokenId,
                payload.newOrder
            ),
            CAPTURE_CHECKOUT
        );
}

async function getSomeAsyncData(dispatch, url, type) {
    // console.log(`👮‍♀️👮‍♂️👮‍♀️: `, type);
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
*/

import {
    FETCH_REQUEST,
    FETCH_SUCCESS,
    FETCH_FAIL,
    PAY_REQUEST,
    PAY_SUCCESS,
    PAY_FAIL,
    PAY_RESET,
} from "./checkout.types";

export function fetchRequest() {
    return {
        type: FETCH_REQUEST,
    };
}
export function fetchSuccess(payload) {
    return {
        type: FETCH_SUCCESS,
        payload,
    };
}
export function fetchFail(payload) {
    return {
        type: FETCH_FAIL,
        payload,
    };
}
export function payRequest() {
    return {
        type: PAY_REQUEST,
    };
}
export function paySuccess(payload) {
    return {
        type: PAY_SUCCESS,
        payload,
    };
}
export function payFail(payload) {
    return {
        type: PAY_FAIL,
        payload,
    };
}
export function payReset() {
    return {
        type: PAY_RESET,
    };
}
