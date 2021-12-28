import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";
import Cookies from "js-cookie";
import {
    emailValidation,
    nameValidation,
    passwordValidation,
} from "../shared/utils/validateForms";
import { getError } from "../shared/utils/error";
import { useSnackbar } from "notistack";
import styles from "../shared/styles/Login.module.css";

// REDUX
import { userRegister } from "../redux/User/user.actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Button from "../components/Button/Button";
const selectUserInfo = (state) => state.user.userInfo;

export default function Register() {
    const router = useRouter();
    const { redirect } = router.query;
    const dispatch = useDispatch();
    let userInfo = useSelector(selectUserInfo, shallowEqual);
    if (userInfo) {
        router.push("/");
    }

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errors, setErrors] = useState({});
    const [pswConfirmationError, setPswConfirmationError] = useState(false);

    const handleBlur = (e) => {
        console.log("e.target.id: ", e.target.id);
        //estraggo il nome dell'input ed il suo valore
        const { id, name, value } = e.target;
        //creo nuovo oggetto ogni volta per rimuovere errori precedenti
        let newErrObj = { ...errors };

        //validate
        if (id === "Name") {
            const resp = nameValidation("Name", value);
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
                setErrors(newErrObj);
            }
        }
    };

    const submitHandler = async (e) => {
        closeSnackbar();
        setPswConfirmationError(false);

        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            if (password !== confirmPassword) {
                // alert("The password doesnt match!");
                setPswConfirmationError("The password doesnt match!");
                return;
            }

            try {
                const { data } = await axios.post("/api/users/register", {
                    name,
                    email,
                    password,
                });
                dispatch(userRegister(data));
                Cookies.set("userInfo", JSON.stringify(data));
                // alert("succesfull Registration!");
                router.push(redirect || "/");
            } catch (err) {
                console.log("error:", err);
                enqueueSnackbar(getError(err), { variant: "error" });
                //if error show allert
            }
        } else {
            console.log("INVALID INPUTS", errors);
            return;
        }
    };

    return (
        <main id={styles["Access"]}>
            <div>
                <h1>Registrazione</h1>

                <form
                    className={styles["filter-form"]}
                    onSubmit={(e) => submitHandler(e)}
                >
                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <span>Nome completo</span>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <input
                            type="text"
                            name="name"
                            id="Name"
                            onChange={(e) => setName(e.target.value)}
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.name && (
                            <div className={"form-error"}>{errors.name}</div>
                        )}
                    </div>

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <span>Email</span>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <input
                            type="text"
                            name="email"
                            id="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.email && (
                            <div className={"form-error"}>{errors.email}</div>
                        )}
                    </div>

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <span>Password</span>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <input
                            type="password"
                            name="password"
                            id="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            onBlur={(e) => handleBlur(e)}
                        />
                        {errors.password && (
                            <div className={"form-error"}>
                                {errors.password}
                            </div>
                        )}
                    </div>

                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <span>Conferma Password</span>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {pswConfirmationError && (
                            <div className={"form-error"}>
                                {pswConfirmationError}
                            </div>
                        )}
                    </div>

                    <div className={styles["filter-form-col-full"]}>
                        <Button
                            text="Registrati"
                            type="submit"
                            style="inverted-btn"
                        />
                    </div>
                    {/* 
                    <button
                        className={styles["filter-form-col-full"]}
                        type="submit"
                    >
                        Registrati
                    </button> */}
                </form>

                <p>
                    Hai già un account?{" "}
                    <Link href={`/login?redirect=${redirect || "/"}`}>
                        <a>Accedi</a>
                    </Link>
                </p>
            </div>
        </main>
    );
}
