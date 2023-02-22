import { useState, memo } from "react";
// import axios from "../../../shared/libs/axios";
import styles from "./Form.module.css";

export default function ContactForm() {
    const [contactReq, setContactReq] = useState({});
    const [robotCheck, setRobotCheck] = useState(false); // finché false non si invia messaggio
    const [isFinished, setIsFinished] = useState(false);
    const [isFailed, setIsFailed] = useState(false);
    const [error, setError] = useState();

    let Form = () => {
        return (
            <form className={styles.form}>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        placeholder="Nome*"
                        defaultValue={contactReq.name || ""}
                        name="name"
                        id="name"
                    />
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        placeholder="Cognome*"
                        defaultValue={contactReq.last || ""}
                        name="last"
                        id="last"
                    />
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        placeholder="Email*"
                        defaultValue={contactReq.email || ""}
                        name="email"
                        id="email"
                    />
                </div>
                <div className={styles.inputWrap}>
                    <input
                        type="text"
                        placeholder="Numero di telefono"
                        defaultValue={contactReq.phone || ""}
                        name="phone"
                        id="phone"
                    />
                </div>
                <div className={styles.inputWrap}>
                    <textarea
                        placeholder="Messaggio*"
                        defaultValue={contactReq.message || ""}
                        name="message"
                        id="message"
                    />
                </div>
                <div className={styles.buttonWrap}>
                    {/* <Button text="Invia" type="submit" /> */}
                    <button className="button form-button">Invia</button>
                </div>
            </form>
        );
    };

    let Confirmation = () => {
        if (isFinished) {
            // return end step, message is sended!
        } else {
            return <div className="loader"></div>;
        }
    };

    if (error || isFailed) {
        // handle error
        // render it
    }

    return (
        <>
            <Form />
        </>
    );
}
