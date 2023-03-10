import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "@/components/Forms/Form.module.css";

// import { userLogin } from "../redux/User/user.actions";
import { selectUserState, userLogin } from "@/redux/slices/userSlice";
import { emailValidation, passwordValidation } from "@/utils/validateForms";
import { getError } from "@/utils/error";

export default function Login() {
    //================================================================================
    // Component State
    //================================================================================
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState({});

    const router = useRouter();
    const { redirect } = router.query;
    const dispatch = useDispatch();
    let userInfo = useSelector(selectUserState, shallowEqual);
    if (userInfo) {
        router.push("/profilo");
    }

    //================================================================================
    // Functions
    //================================================================================
    const validateData = (e) => {
        e.preventDefault();
        const { id, name, value } = e.target;

        // validate data + setErrors
        let newErrObj = { ...errors };
        if (id === "Email") {
            const resp = emailValidation(value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.keys(errors).length === 0) {
            try {
                const { data } = await axios.post("/api/auth/login", {
                    email,
                    password,
                });
                // Cookies.set("userInfo", JSON.stringify(data));
                // let clone = (({ token, ...obj }) => obj)(data);
                dispatch(userLogin(data));
                router.push(redirect || "/");
            } catch (err) {
                alert(getError(err));
            }
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main>
            <section className="page">
                <h1>Login</h1>
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.inputWrap}>
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={(e) => validateData(e)}
                        />
                    </div>
                    <div className={styles.inputWrap}>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            // onBlur={(e) => validateData(e)}
                        />
                    </div>
                    <div className={styles.buttonWrap}>
                        <button className="button form-button">Accedi</button>
                    </div>
                </form>

                <p className={styles.toggleForms}>
                    <Link href={"/profilo/reset-psw"}>
                        Ho dimenticato la mia password
                    </Link>
                </p>
                <p className={styles.toggleForms}>
                    Non hai ancora un profilo?{" "}
                    <Link href={"/profilo/registrazione"}>Registrati qui</Link>
                </p>
            </section>
        </main>
    );
}
