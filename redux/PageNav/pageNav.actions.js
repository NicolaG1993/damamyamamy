import { SETUP, LOAD_NEW_PAGE, LOAD_EXACT_PAGE } from "./pageNav.types";

export function setPageNav(payload) {
    return {
        type: SETUP,
        payload,
    };
}
export function loadNewPage(payload) {
    return {
        type: LOAD_NEW_PAGE,
        payload,
    };
}
export function loadExactPage(payload) {
    return {
        type: LOAD_EXACT_PAGE,
        payload,
    };
}
