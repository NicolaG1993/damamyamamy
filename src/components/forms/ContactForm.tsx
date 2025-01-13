"use client";

import { useRef, useState } from "react";
import styles from "./Form.module.css";
import ReCAPTCHA from "react-google-recaptcha";
import {
    emailValidation,
    nameValidation,
    textValidation,
} from "@/utils/validateInput";
import axios from "axios";

export default function ContactForm() {
    //================================================================================
    // Component State
    //================================================================================
    const [activeStep, setActiveStep] = useState(1);
    const [isFinished, setIsFinished] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [formData, setFormData] = useState({
        first: "",
        last: "",
        email: "",
        phone: "",
        message: "",
        sender: "Da Mamy a Mamy • Contattaci",
        domain: "damamyamamy.com",
    });
    const [errors, setErrors] = useState({});
    const recaptchaRef = useRef();

    //================================================================================
    // Functions
    //================================================================================
    const nextStep = () => {
        setActiveStep((prev) => (prev <= 2 ? prev + 1 : 2));
    };
    const backStep = () => {
        setActiveStep((prev) => (prev > 1 ? prev - 1 : 1));
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        // e.preventDefault();
        const { name, value } = e.target;
        const newState = { ...formData, [name]: value };
        setFormData(newState);
    };

    const validateData = (key, value) => {
        // e.preventDefault();
        if (!value) {
            value = "";
        }
        // validate data + setErrors
        let newErrObj = errors;
        if (key === "first" || key === "last") {
            const resp = nameValidation(
                key !== "last" ? "nome" : "cognome",
                value
            );
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

    const handleSubmit = (e) => {
        e.preventDefault();

        Object.entries(formData).map(([key, value]) =>
            validateData(key, value)
        );

        if (Object.keys(errors).length === 0) {
            recaptchaRef.current.execute();
        }
    };

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        sendEmail();
        recaptchaRef.current.reset();
    };

    const sendEmail = async () => {
        nextStep();
        try {
            const res = await axios.post("/api/email/contact-us", formData);
            // console.log("res: ", res);

            if (res.status === 201 && res.data.emailSended) {
                setIsFailed(false);
                setIsFinished(true);
            } else {
                setIsFailed(res.data.body || res.data.message);
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                console.error(
                    "Axios error:",
                    err.response?.data || err.message
                );
                alert(
                    `Errore: ${
                        err.response?.data.message || "Qualcosa é andato storto"
                    }`
                );
            } else {
                console.error("Unexpected error:", err);
                alert("Errore non previsto, contattare sviluppatore");
                setIsFailed(err);
            }
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    if (activeStep === 1) {
        return (
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
                        value={formData.first}
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
                        value={formData.last}
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
                        value={formData.email}
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
                        value={formData.phone}
                        name="phone"
                        id="Phone"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div className={styles.inputWrap}>
                    <textarea
                        placeholder="Messaggio*"
                        value={formData.message}
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
                    <button type="submit" className="secondary form-button">
                        Invia
                    </button>
                </div>
            </form>
        );
    } else if (activeStep === 2) {
        // TODO: Missing css classes 🧠🧠🧠
        if (isFinished) {
            return (
                <div className="center">
                    <div className="success">
                        <p>Messaggio inviato!</p>
                    </div>
                    <p onClick={() => backStep()} style={{ cursor: "pointer" }}>
                        Torna indietro
                    </p>
                </div>
            );
        } else if (isFailed) {
            return (
                <div className="center">
                    <div className="error">
                        <p>
                            Sembra esserci un errore, non abbiamo ricevuto
                            questo messaggio. Riprova o contattaci direttamente
                            via email o via telefono.
                        </p>
                    </div>
                    <p onClick={() => backStep()} style={{ cursor: "pointer" }}>
                        Torna indietro
                    </p>
                </div>
            );
        } else {
            return (
                <div className="center">
                    <div className="loader">Attendere, invio in corso...</div>
                </div>
            );
        }
    }
}
