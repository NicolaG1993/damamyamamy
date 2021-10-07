import { useState } from "react";
import {
    nameValidation,
    emailValidation,
    textValidation,
} from "../../../../shared/utils/validateForms";
import Button from "../../../Button/Button";

export default function StepA({ next, contactReq, styles }) {
    const [values, setValues] = useState(contactReq || {});
    const [errors, setErrors] = useState({});
    // console.log("values: ", values);

    const handleForm = (e) => {
        e.preventDefault();
        const form = e.target.form;
        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());
        allValues.sender = "Da Mamy a Mamy - Contattaci";
        allValues.domain = "damamyamamy.com";
        setValues(allValues);
    };

    const validate = (e) => {
        e.preventDefault();

        if (Object.keys(values).length === 0) {
            console.log("NO INPUTS");
            return;
        }

        let newErrObj = {
            fnameCheck: nameValidation("nome", values.name),
            lnameCheck: nameValidation("cognome", values.last),
            emailCheck: emailValidation(values.email),
            textCheck: textValidation(values.message),
        };

        if (!newErrObj.fnameCheck) {
            delete newErrObj.fnameCheck;
        }
        if (!newErrObj.lnameCheck) {
            delete newErrObj.lnameCheck;
        }
        if (!newErrObj.emailCheck) {
            delete newErrObj.emailCheck;
        }
        if (!newErrObj.textCheck) {
            delete newErrObj.textCheck;
        }

        if (Object.keys(newErrObj).length === 0) {
            console.log("VALID INPUTS! OK");
            next(values);
        } else {
            console.log("INVALID INPUTS");
            setErrors(newErrObj);
            return;
        }
    };

    const ErrorsBox = () => (
        <div className={styles["contact-form-error-wrap"]}>
            {Object.values(errors).map((error, i) => {
                console.log("error ", error);
                return <p key={i}>• {error}</p>;
            })}
        </div>
    );

    return (
        <>
            {Object.keys(errors).length !== 0 && <ErrorsBox />}
            <form
                className={styles["contact-form"]}
                onLoad={(e) => handleForm(e)}
                onInput={(e) => handleForm(e)}
                onSubmit={(e) => validate(e)}
            >
                <div className={styles["contact-form-col-left"]}>
                    <input
                        type="text"
                        placeholder="Nome*"
                        defaultValue={contactReq.name || ""}
                        name="name"
                        id="name"
                    />
                </div>
                <div className={styles["contact-form-col-right"]}>
                    <input
                        type="text"
                        placeholder="Cognome*"
                        defaultValue={contactReq.last || ""}
                        name="last"
                        id="last"
                    />
                </div>
                <div className={styles["contact-form-col-left"]}>
                    <input
                        type="text"
                        placeholder="Email*"
                        defaultValue={contactReq.email || ""}
                        name="email"
                        id="email"
                    />
                </div>
                <div className={styles["contact-form-col-right"]}>
                    <input
                        type="text"
                        placeholder="Numero di telefono"
                        defaultValue={contactReq.phone || ""}
                        name="phone"
                        id="phone"
                    />
                </div>
                <div className={styles["contact-form-col-full"]}>
                    <textarea
                        placeholder="Messaggio"
                        defaultValue={contactReq.message || ""}
                        name="message"
                        id="message"
                    />
                </div>
                <div className={styles["contact-form-col-full"]}>
                    <Button text="Invia" type="submit" />
                </div>
            </form>
        </>
    );
}
