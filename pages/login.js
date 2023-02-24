import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "@/components/Forms/Form.module.css";

import { emailValidation, passwordValidation } from "@/utils/validateForms";
import { getError } from "@/utils/error";

export default function Login() {
    //================================================================================
    // Component State
    //================================================================================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //================================================================================
    // Functions
    //================================================================================

    //================================================================================
    // Render UI
    //================================================================================
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
