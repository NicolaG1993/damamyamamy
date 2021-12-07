import { USER_REGISTER, USER_LOGIN, USER_LOGOUT } from "./user.types";

export function userRegister(payload) {
    return {
        type: USER_REGISTER,
        payload,
    };
}
export function userLogin(payload) {
    return {
        type: USER_LOGIN,
        payload,
    };
}
export function userLogout() {
    return {
        type: USER_LOGOUT,
    };
}
