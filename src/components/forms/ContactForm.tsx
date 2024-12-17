import { useRef } from "react";
import styles from "./Form.module.css";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactForm({
    handleChange,
    formState,
    sendEmail,
    errors,
    validateData,
    handleSubmit,
}) {
    const recaptchaRef = useRef(); // move to parent? 🧠

    const onReCAPTCHAChange = (captchaCode) => {
        if (!captchaCode) {
            return;
        }
        sendEmail();
        recaptchaRef.current.reset();
    };

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
                    value={formState.first}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => validateData(e.target.name, e.target.value)}
                />
                {errors.first && (
                    <div className={styles["form-error"]}>• {errors.first}</div>
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
                    onBlur={(e) => validateData(e.target.name, e.target.value)}
                />
                {errors.last && (
                    <div className={styles["form-error"]}>• {errors.last}</div>
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
                    onBlur={(e) => validateData(e.target.name, e.target.value)}
                />
                {errors.email && (
                    <div className={styles["form-error"]}>• {errors.email}</div>
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
                    onBlur={(e) => validateData(e.target.name, e.target.value)}
                />
                {errors.message && (
                    <div className={styles["form-error"]}>
                        • {errors.message}
                    </div>
                )}
            </div>
            <div className={styles.buttonWrap}>
                <button type="submit" className="primary form-button">
                    Invia
                </button>
            </div>
        </form>
    );
}
