import styles from "@/components/Forms/Form.module.css";
import Link from "next/link";

export default function Registrazione() {
    return (
        <main>
            <section className="page">
                <h1>Registrati</h1>
                <form className={styles.form}>
                    <div className={styles.inputWrap}>
                        <input
                            type="text"
                            placeholder="Nome*"
                            name="name"
                            id="name"
                            // defaultValue={contactReq.name || ""}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <input
                            type="text"
                            placeholder="Cognome*"
                            name="last"
                            id="last"
                            // defaultValue={contactReq.last || ""}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <input
                            type="text"
                            placeholder="Email*"
                            name="email"
                            id="email"
                            // defaultValue={contactReq.email || ""}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <input
                            type="password"
                            placeholder="Password*"
                            name="password"
                            id="password"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <input
                            type="password"
                            placeholder="Conferma Password*"
                            name="password-confirm"
                            id="passwordConfirm"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonWrap}>
                        <button className="button form-button">Accedi</button>
                    </div>
                </form>
                <p className={styles.toggleForms}>
                    Hai giá un profilo? <Link href={"/login"}>Accedi</Link>
                </p>
            </section>
        </main>
    );
}
