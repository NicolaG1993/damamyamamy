import { TOGGLE, OPEN, CLOSE, SET_COLOR } from "./toggleLayout.types";

export function toggleLayout(payload) {
    let fn = payload.fn;

    if (fn === "toggle") {
        return {
            type: TOGGLE,
            payload,
        };
    }

    if (fn === "open") {
        return {
            type: OPEN,
            payload,
        };
    }

    if (fn === "close") {
        return {
            type: CLOSE,
            payload,
        };
    }
}

export function setColorButton(payload) {
    return {
        type: SET_COLOR,
        payload,
    };
}
