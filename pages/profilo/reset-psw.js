import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import styles from "@/components/Forms/Form.module.css";
import { emailValidation, passwordValidation } from "@/utils/validateForms";
import { getError } from "@/utils/error";
import axios from "axios";
import ReCAPTCHA from "react-google-recaptcha";
import Head from "next/head";

export default function ResetPsw() {
    //================================================================================
    // Component State
    //================================================================================
    const [renderView, setRenderView] = useState(1);
    const [email, setEmail] = useState();
    const [code, setCode] = useState();
    const [password, setPassword] = useState();
    const [error, setError] = useState(false);
    const [formError, setFormError] = useState(false);
    const recaptchaRef = useRef();

    //================================================================================
    // Functions
    //================================================================================
    const validateData = (key, value) => {
        // e.preventDefault();
        if (!value) {
            value = "";
        }
        if (key === "email") {
            const resp = emailValidation(value);
            if (resp) {
                setFormError(resp);
            } else {
                setFormError(false);
            }
        }
        if (key === "password") {
            const resp = passwordValidation(value);
            if (resp) {
                setFormError(resp);
            } else {
                setFormError(false);
            }
        }
    };

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        sendCode();
        recaptchaRef.current.reset();
    };

    function handleEmailSubmit(e) {
        // e.preventDefault();
        console.log("handleEmailSubmit: ", email);
        validateData("email", email);
        if (email && !formError) {
            recaptchaRef.current.execute();
        }
    }

    async function handlePswSubmit(e) {
        console.log("handlePswSubmit: ", password);
        e.preventDefault;
        try {
            validateData("password", password);

            if (password && !formError) {
                const resp = await axios.post("/api/auth/reset-psw", {
                    code: code,
                    password: password,
                });
                setError(false);
                setRenderView(3);
            }
        } catch (err) {
            setError(err);
        }
    }

    //================================================================================
    // API Requests
    //================================================================================
    async function sendCode() {
        try {
            const resp = await axios.post("/api/email/send-code", {
                email: email.toLowerCase(),
            });
            if (resp.data.emailSended) {
                setError(false);
                setRenderView(2);
            } else {
                setError(resp.data.body);
            }
        } catch (err) {
            setError(err);
        }
    }

    //================================================================================
    // Sub-Components
    //================================================================================
    function determineWhichViewToRender() {
        if (renderView === 1) {
            return (
                <>
                    <div className={styles.form}>
                        <div className={styles.inputWrap}>
                            <input
                                type="text"
                                placeholder="Email"
                                name="email"
                                id="Email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onBlur={(e) =>
                                    validateData(e.target.name, e.target.value)
                                }
                            />
                            {formError && (
                                <div className={styles["form-error"]}>
                                    • {getError(formError)}
                                </div>
                            )}
                        </div>
                        <div className={styles.buttonWrap}>
                            <button
                                disabled={email && !formError ? false : true}
                                className={`${
                                    email && !formError
                                        ? "button form-button"
                                        : "button-disabled form-button"
                                }`}
                                onClick={(e) => handleEmailSubmit(e, email)}
                            >
                                Conferma
                            </button>
                        </div>
                    </div>
                    <p
                        className={`${styles.toggleForms} fake-link`}
                        onClick={() => {
                            setError(false);
                            setFormError(false);
                            setRenderView(2);
                        }}
                    >
                        Ho già un codice
                    </p>
                    <p className={styles.toggleForms}>
                        <Link href={"/profilo/login"}>Torna al login</Link>
                    </p>
                </>
            );
        } else if (renderView === 2) {
            return (
                <>
                    <div className={styles.form}>
                        <div className={styles.inputWrap}>
                            <input
                                type="text"
                                placeholder="Codice"
                                name="code"
                                id="Code"
                                required
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                            />
                        </div>
                        <div className={styles.inputWrap}>
                            <input
                                type="password"
                                placeholder="Nuova Password"
                                name="password"
                                id="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onBlur={(e) =>
                                    validateData(e.target.name, e.target.value)
                                }
                            />
                            {formError && (
                                <div className={styles["form-error"]}>
                                    • {getError(formError)}
                                </div>
                            )}
                        </div>
                        <div className={styles.buttonWrap}>
                            <button
                                disabled={email && !formError ? false : true}
                                className={`${
                                    code && !formError
                                        ? "button form-button"
                                        : "button-disabled form-button"
                                }`}
                                onClick={(e) => handlePswSubmit(e)}
                            >
                                Conferma
                            </button>
                        </div>
                    </div>
                    <p
                        className={`${styles.toggleForms} fake-link`}
                        onClick={() => {
                            setError(false);
                            setFormError(false);
                            setRenderView(1);
                        }}
                    >
                        Torna indietro
                    </p>
                </>
            );
        } else if (renderView === 3) {
            return (
                <>
                    <div className="success">
                        <p>
                            La tua password per l&apos;indirizzo {email} è stata
                            reimpostata con successo
                        </p>
                    </div>
                    <p className={styles.toggleForms}>
                        <Link href={"/profilo/login"}>Accedi</Link>
                    </p>
                </>
            );
        }
    }

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main>
            <Head>
                <title>Reimposta la tua password • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Reimposta la tua password • Da Mamy a Mamy"
                />
            </Head>

            <section className="page">
                <h1>Reset Password</h1>
                {error && <div className="error">{getError(error)}</div>}
                <ReCAPTCHA
                    ref={recaptchaRef}
                    size="invisible"
                    sitekey={process.env.RECAPTCHA_PUBLIC_KEY}
                    onChange={onReCAPTCHAChange}
                />
                {determineWhichViewToRender()}
            </section>
        </main>
    );
}
