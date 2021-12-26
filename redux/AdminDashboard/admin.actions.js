import { USERS_ORDER } from "./admin.types";

export function usersOrder(payload) {
    return {
        type: USERS_ORDER,
        payload,
    };
}
