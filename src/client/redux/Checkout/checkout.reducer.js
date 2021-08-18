/* eslint-disable indent */
import {
    LOAD_CHECKOUT,
    CAPTURE_CHECKOUT,
    HANDLE_ERROR,
} from "./checkout.types";

const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case LOAD_CHECKOUT:
            return { ...state, error: false };

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
