export const titleValidation = (fieldName: string, fieldValue: string) => {
    // if (fieldValue.trim() === "") {
    //     return `Il ${fieldName} è richiesto`;
    // } else if (
    //     /[^a-zA-Z0-9&.,:+_ áéíóúàèìòùÁÉÍÓÚÀÈÌÒÙäöüÄÖÜ'`-]/.test(fieldValue)
    // ) {
    //     return null;
    // } else if (fieldValue.trim().length < 3) {
    //     return `Il ${fieldName} deve contenere almeno 3 lettere`;
    // } else {
    //     return "Caratteri non consentiti";
    // }

    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    } else if (fieldValue.trim().length < 3) {
        return `Il ${fieldName} deve contenere almeno 3 lettere`;
    } else {
        return null;
    }
};

export const nicknameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    } else if (fieldValue.trim().length < 3) {
        return `Il ${fieldName} deve contenere almeno 3 lettere`;
    } else if (/^[a-zA-Z0-9 _.-]*$/.test(fieldValue)) {
        // /^[^0-9]\w+$/
        return null;
    } else {
        return "Caratteri non consentiti";
    }
};

export const nameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    } else if (fieldValue.trim().length < 3) {
        return `Il ${fieldName} deve contenere almeno 3 lettere`;
    } else if (
        /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u.test(
            fieldValue
        )
    ) {
        return null;
    } else {
        return "Caratteri non consentiti";
    }
};

export const emailValidation = (email: string) => {
    if (
        /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-]+$/.test(
            email
        )
    ) {
        return null;
    }
    if (email.trim() === "") {
        return "È richiesta un'email";
    }
    return "Perfavore inserisci un'email valida";
};

export const urlValidation = (url) => {
    if (
        /\b(https?|ftp|file):\/\/[\-A-Za-z0-9+&@#\/%?=~_|!:,.;]*[\-A-Za-z0-9+&@#\/%=~_|]/.test(
            url
        )
    ) {
        return null;
    }
    if (url.trim() === "") {
        return "È richiesta un url";
    }
    return "Perfavore inserisci un url valido";
};

export const passwordValidation = (password) => {
    if (password.trim().length < 6) {
        return "La password deve contenere almeno 6 caratteri";
    } else {
        return null;
    }
};

export const confirmPassword = (password, value) => {
    if (password !== value) {
        return "Le due passwords non corrispondono";
    } else {
        return null;
    }
};

export const addressValidation = (fieldName: string, fieldValue: string) => {
    if (fieldValue.trim().length < 1) {
        return `L'${fieldName} è richiesto`;
    } else {
        return null;
    }
};

export const requestedValue = (fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Devi inserire qualcosa`;
    }
    return null;
};
export const textValidation = (fieldValue: string) => {
    if (fieldValue.trim() === "") {
        return `Devi scriverci qualcosa`;
    }
    return null;
};

export const numberValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    }
    if (/^\d+$/.test(fieldValue)) {
        return null;
    }
    return `${fieldName} deve essere un numero`;
};

export const decimalValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    }
    if (/^\d*(\.\d{0,2})?$/.test(fieldValue)) {
        return null;
    }
    return `${fieldName} deve essere un numero`;
};

export const slugValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Lo ${fieldName} è richiesto`;
    } // 🧨 devo controllare che non ci siano spazi (ancora meglio se li sostituisco con "-")
    return null;
};

// module.exports = {
//     titleValidation,
//     nameValidation,
//     nicknameValidation,
//     emailValidation,
//     requestedValue,
//     textValidation,
//     numberValidation,
//     decimalValidation,
//     passwordValidation,
//     confirmPassword,
//     addressValidation,
//     slugValidation,
//     urlValidation,
// };
