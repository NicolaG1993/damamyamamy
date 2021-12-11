/* eslint-disable indent */

/*
import {
    LOAD_CHECKOUT,
    CAPTURE_CHECKOUT,
    HANDLE_ERROR,
    AUTHORIZE_PP,
} from "./checkout.types";

const INITIAL_STATE = { smth: 0 };

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_CHECKOUT:
            return { ...state, error: false };

        // case AUTHORIZE_PP: {
        //     let authOrder = action.payload;
        //     console.log("AUTHORIZE_PP: ", authOrder);
        //     return { ...state, authOrderPP: authOrder };
        // }
        case CAPTURE_CHECKOUT: {
            let incomingOrder = action.payload;
            console.log("CAPTURE_CHECKOUT: ", incomingOrder);
            return { ...state, order: incomingOrder };
        }

        case HANDLE_ERROR: {
            let { error } = action.payload;
            let { actionType } = action.payload;
            console.log("HANDLE_ERROR error: ", error);
            console.log("HANDLE_ERROR action: ", actionType);
            return {
                ...state,
                error: { actionType: actionType, err: error },
            };
        }

        default:
            return state;
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

export default function reducer(state = {}, action) {
    switch (action.type) {
        case FETCH_REQUEST:
            return { ...state, loading: true, error: "" };
        case FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
                error: "",
            };
        case FETCH_FAIL:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        case PAY_REQUEST:
            return {
                ...state,
                loadingPay: true,
            };
        case PAY_SUCCESS:
            return {
                ...state,
                loadingPay: false,
                successPay: true,
            };
        case PAY_FAIL:
            return {
                ...state,
                loadingPay: false,
                errorPay: action.payload,
            };
        case PAY_RESET:
            return {
                ...state,
                loadingPay: false,
                successPay: false,
                errorPay: false,
            };
        default:
            return state;
    }
}
