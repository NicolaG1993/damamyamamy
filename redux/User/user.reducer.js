/* eslint-disable indent */
import Cookies from "js-cookie";
import { USER_REGISTER, USER_LOGIN, USER_LOGOUT } from "./user.types";

const INITIAL_STATE = {
    userInfo: Cookies.get("userInfo")
        ? JSON.parse(Cookies.get("userInfo"))
        : null,
};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case USER_REGISTER: {
            console.log("action.payload:", action.payload);
            return { ...state, userInfo: action.payload };
        }
        case USER_LOGIN: {
            console.log("action.payload:", action.payload);

            return { ...state, userInfo: action.payload };
        }
        case USER_LOGOUT: {
            return {
                ...state,
                userInfo: null,
                cart: { cartItems: [], shippingAddress: {}, paymentMethod: "" },
            };
        }

        default:
            return state;
    }
}
