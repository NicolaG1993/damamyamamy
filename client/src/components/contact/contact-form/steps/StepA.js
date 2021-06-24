import React, { useState, useEffect } from "react";
import {
    nameValidation,
    emailValidation,
    numberValidation,
    requestedValue,
} from "../../../../utils/validate-forms";

export default function StepA({ next, contactReq }) {
    const [values, setValues] = useState(contactReq || {});
    const [errors, setErrors] = useState({});
    console.log("values: ", values);
    // console.log("errors: ", errors);

    const handleForm = (e) => {
        // console.log("e: ", e);
        e.preventDefault();
        const form = e.target.form;
        const data = new FormData(form);
        const allValues = Object.fromEntries(data.entries());
        setValues(allValues);
    };

    const validate = (e) => {
        e.preventDefault();

        if (Object.keys(values).length === 0) {
            console.log("NO INPUTS");
            return;
        }

        let newErrObj = {
            fnameCheck: nameValidation("nome", values.contactname),
            lnameCheck: nameValidation("cognome", values.contactlast),
            emailCheck: emailValidation(values.email),
            textCheck: requestedValue(values.message),
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
        <div className="contact-form-error-wrap">
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
                className="contact-form"
                onLoad={(e) => handleForm(e)}
                onInput={(e) => handleForm(e)}
                onSubmit={(e) => validate(e)}
            >
                <div className="contact-form-col-left">
                    <input
                        type="text"
                        placeholder="Nome*"
                        defaultValue={contactReq.contactname || ""}
                        name="contactname"
                        id="contactname"
                    />
                </div>
                <div className="contact-form-col-right">
                    <input
                        type="text"
                        placeholder="Cognome*"
                        defaultValue={contactReq.contactlast || ""}
                        name="contactlast"
                        id="contactlast"
                    />
                </div>
                <div className="contact-form-col-left">
                    <input
                        type="text"
                        placeholder="Email*"
                        defaultValue={contactReq.email || ""}
                        name="email"
                        id="email"
                    />
                </div>
                <div className="contact-form-col-right">
                    <input
                        type="text"
                        placeholder="Numero di telefono"
                        defaultValue={contactReq.phone || ""}
                        name="phone"
                        id="phone"
                    />
                </div>
                <div className="contact-form-col-full">
                    <textarea
                        placeholder="Messaggio"
                        defaultValue={contactReq.message || ""}
                        name="message"
                        id="message"
                    />
                </div>
                <div className="contact-form-col-full">
                    <button type="submit" className="btn2">
                        Invia
                    </button>
                </div>
            </form>
        </>
    );
}
