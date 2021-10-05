import { TOGGLE, OPEN, CLOSE } from "./toggleLayout.types";

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
