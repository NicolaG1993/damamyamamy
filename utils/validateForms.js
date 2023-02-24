const titleValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    }
    if (/[^a-zA-Z0-9&.,:+_ áéíóúàèìòùÁÉÍÓÚÀÈÌÒÙäöüÄÖÜ'`-]/.test(fieldValue)) {
        return "Caratteri non consentiti";
    }
    if (fieldValue.trim().length < 3) {
        return `Il ${fieldName} deve contenere almeno 3 lettere`;
    }
    return null;
};

const nameValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    }
    if (/^\s*([A-Za-z]{1,}([\.,] |[-']| ))+[A-Za-z]+\.?\s*$/.test(fieldValue)) {
        return "Caratteri non consentiti";
    }
    if (fieldValue.trim().length < 3) {
        return `Il ${fieldName} deve contenere almeno 3 lettere`;
    }
    return null;
};

const emailValidation = (email) => {
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

const passwordValidation = (password) => {
    if (password.trim().length < 6) {
        return "La password deve contenere almeno 6 caratteri";
    } else {
        return null;
    }
};

const confirmPassword = (password, value) => {
    if (password !== value) {
        return "Le due passwords non corrispondono";
    } else {
        return null;
    }
};

const addressValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim().length < 1) {
        return `L'${fieldName} è richiesto`;
    } else {
        return null;
    }
};

const requestedValue = (fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Devi inserire qualcosa`;
    }
    return null;
};
const textValidation = (fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Devi scriverci qualcosa`;
    }
    return null;
};

const numberValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    }
    if (/^\d+$/.test(fieldValue)) {
        return null;
    }
    return `${fieldName} deve essere un numero`;
};

const decimalValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Il ${fieldName} è richiesto`;
    }
    if (/^\d*(\.\d{0,2})?$/.test(fieldValue)) {
        return null;
    }
    return `${fieldName} deve essere un numero`;
};

const slugValidation = (fieldName, fieldValue) => {
    if (fieldValue.trim() === "") {
        return `Lo ${fieldName} è richiesto`;
    } // 🧨 devo controllare che non ci siano spazi (ancora meglio se li sostituisco con "-")
    return null;
};

module.exports = {
    titleValidation,
    nameValidation,
    emailValidation,
    requestedValue,
    textValidation,
    numberValidation,
    decimalValidation,
    passwordValidation,
    confirmPassword,
    addressValidation,
    slugValidation,
};
