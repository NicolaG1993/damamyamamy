/* eslint-disable indent */
import Cookies from "js-cookie";
import { USERS_ORDER } from "./admin.types";

const INITIAL_STATE = {};

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case USERS_ORDER: {
            console.log("action.payload:", action.payload);
            return { ...state, users_order: action.payload };
        }

        default:
            return state;
    }
}
