import styles from "@/components/Forms/Form.module.css";
import Link from "next/link";

export default function Login() {
    return (
        <main>
            <section className="page">
                <h1>Login</h1>
                <form className={styles.form}>
                    <div className={styles.inputWrap}>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            id="email"
                            // defaultValue={contactReq.email || ""}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            // onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className={styles.buttonWrap}>
                        <button className="button form-button">Accedi</button>
                    </div>
                </form>

                <p className={styles.toggleForms}>
                    Non hai ancora un profilo?{" "}
                    <Link href={"/registrazione"}>Registrati qui</Link>
                </p>
            </section>
        </main>
    );
}
