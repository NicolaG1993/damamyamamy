import { useState, createRef, memo, useRef } from "react";
// import axios from "../../../shared/libs/axios";
import styles from "./Form.module.css";
import ReCAPTCHA from "react-google-recaptcha";

import {
    emailValidation,
    nameValidation,
    textValidation,
} from "@/utils/validateForms";

export default function ContactForm({ handleChange, formState, sendEmail }) {
    //================================================================================
    // Component State
    //================================================================================
    const [errors, setErrors] = useState({});
    const recaptchaRef = useRef();

    //================================================================================
    // Functions
    //================================================================================
    const validateData = (key, value) => {
        // e.preventDefault();
        if (!value) {
            value = "";
        }
        // validate data + setErrors
        let newErrObj = errors;
        if (key === "first" || key === "last") {
            const resp = nameValidation("nome", value);
            if (resp) {
                newErrObj[key] = resp;
            } else {
                delete newErrObj[key];
            }
        }
        if (key === "email") {
            const resp = emailValidation(value);
            if (resp) {
                newErrObj[key] = resp;
            } else {
                delete newErrObj[key];
            }
        }
        if (key === "message") {
            const resp = textValidation(value);
            if (resp) {
                newErrObj[key] = resp;
            } else {
                delete newErrObj[key];
            }
        }

        setErrors((prev) => ({ ...prev, ...newErrObj }));
    };

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        sendEmail();
        recaptchaRef.current.reset();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        Object.entries(formState).map(([key, value]) =>
            validateData(key, value)
        );

        if (Object.keys(errors).length === 0) {
            recaptchaRef.current.execute();
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <>
            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.RECAPTCHA_PUBLIC_KEY}
                    onChange={onReCAPTCHAChange}
                />

                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        placeholder="Nome*"
                        name="first"
                        id="First"
                        value={formState.first}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) =>
                            validateData(e.target.name, e.target.value)
                        }
                    />
                    {errors.first && (
                        <div className={styles["form-error"]}>
                            • {errors.first}
                        </div>
                    )}
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        placeholder="Cognome*"
                        name="last"
                        id="Last"
                        value={formState.last}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) =>
                            validateData(e.target.name, e.target.value)
                        }
                    />
                    {errors.last && (
                        <div className={styles["form-error"]}>
                            • {errors.last}
                        </div>
                    )}
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type="email"
                        placeholder="Email*"
                        name="email"
                        id="Email"
                        value={formState.email}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) =>
                            validateData(e.target.name, e.target.value)
                        }
                    />
                    {errors.email && (
                        <div className={styles["form-error"]}>
                            • {errors.email}
                        </div>
                    )}
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        placeholder="Numero di telefono"
                        value={formState.phone}
                        name="phone"
                        id="Phone"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <textarea
                        placeholder="Messaggio*"
                        value={formState.message}
                        name="message"
                        id="Message"
                        className={styles.message}
                        onChange={(e) => handleChange(e)}
                        onBlur={(e) =>
                            validateData(e.target.name, e.target.value)
                        }
                    />
                    {errors.message && (
                        <div className={styles["form-error"]}>
                            • {errors.message}
                        </div>
                    )}
                </div>
                <div className={styles.buttonWrap}>
                    <button type="submit" className="button form-button">
                        Invia
                    </button>
                </div>
            </form>
        </>
    );
}
