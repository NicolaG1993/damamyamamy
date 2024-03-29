import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import styles from "@/components/Forms/Form.module.css";

import { selectUserState, userLogin } from "@/redux/slices/userSlice";
import {
    emailValidation,
    nameValidation,
    passwordValidation,
    confirmPassword,
} from "@/utils/validateForms";
import { getError } from "@/utils/error";
import Head from "next/head";
// import { useSnackbar } from "notistack";

export default function Registrazione() {
    //================================================================================
    // Component State
    //================================================================================
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [errors, setErrors] = useState({});

    const router = useRouter();
    const { redirect } = router.query; // non in uso
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
        if (id === "First" || id === "Last") {
            const resp = nameValidation("nome", value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Email") {
            const resp = emailValidation(value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                setErrors(newErrObj);
            }
        }
        if (id === "Password") {
            const resp = passwordValidation(value);
            if (resp) {
                setErrors({ ...errors, [name]: resp });
            } else {
                delete newErrObj[name];
                const resp = confirmPassword(value, passwordConfirm);
                if (resp) {
                    setErrors({ ...newErrObj, confirmPassword: resp });
                } else {
                    delete newErrObj.confirmPassword;
                    setErrors(newErrObj);
                }
            }
        }
        if (id === "ConfirmPassword") {
            const resp = confirmPassword(password, value);
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
                const { data } = await axios.post("/api/auth/register", {
                    firstName,
                    lastName,
                    email,
                    password,
                });
                // Cookies.set("userInfo", JSON.stringify(data));
                // let clone = (({ token, ...obj }) => obj)(data); // remove obj key
                dispatch(userLogin(data));
                await axios.post("/api/email/welcome", {
                    first: data.firstName,
                    last: data.lastName,
                    email: data.email,
                });
                router.push(redirect || "/");
            } catch (err) {
                // console.log("error:", err);
                alert(getError(err));
                // enqueueSnackbar(getError(err), { variant: "error" });
                //if error show allert
            }
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main>
            <Head>
                <title>Registrazione • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Registrazione • Da Mamy a Mamy"
                />
            </Head>

            <section className="page">
                <h1>Registrazione</h1>
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.inputWrap}>
                        <input
                            type="text"
                            placeholder="Nome*"
                            name="first"
                            id="First"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            onBlur={(e) => validateData(e)}
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
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            onBlur={(e) => validateData(e)}
                        />
                        {errors.last && (
                            <div className={styles["form-error"]}>
                                • {errors.last}
                            </div>
                        )}
                    </div>
                    <div className={styles.inputWrap}>
                        <input
                            type="text"
                            placeholder="Email*"
                            name="email"
                            id="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={(e) => validateData(e)}
                        />
                        {errors.email && (
                            <div className={styles["form-error"]}>
                                • {errors.email}
                            </div>
                        )}
                    </div>
                    <div className={styles.inputWrap}>
                        <input
                            type="password"
                            placeholder="Password*"
                            name="password"
                            id="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={(e) => validateData(e)}
                        />
                        {errors.password && (
                            <div className={styles["form-error"]}>
                                • {errors.password}
                            </div>
                        )}
                    </div>
                    <div className={styles.inputWrap}>
                        <input
                            type="password"
                            placeholder="Conferma Password*"
                            name="confirmPassword"
                            id="ConfirmPassword"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            onBlur={(e) => validateData(e)}
                        />
                        {errors.confirmPassword && (
                            <div className={styles["form-error"]}>
                                • {errors.confirmPassword}
                            </div>
                        )}
                    </div>
                    <div className={styles.buttonWrap}>
                        <button type="submit" className="button form-button">
                            Registrati
                        </button>
                    </div>
                </form>
                <p className={styles.toggleForms}>
                    Hai giá un profilo?{" "}
                    <Link href={"/profilo/login"}>Accedi</Link>
                </p>
            </section>
        </main>
    );
}
