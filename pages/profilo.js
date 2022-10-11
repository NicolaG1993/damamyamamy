import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import {
    emailValidation,
    nameValidation,
    passwordValidation,
} from "../shared/utils/validateForms";
import { userRegister } from "../redux/User/user.actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styles from "../shared/styles/Profile.module.css";
import Button from "../components/Button/Button";
const selectUserInfo = (state) => state.user.userInfo;

function Profile() {
    const router = useRouter();
    const dispatch = useDispatch();
    let userInfo = useSelector(selectUserInfo, shallowEqual);
    console.log("userInfo: ", userInfo);

    if (!userInfo) {
        router.push("/login");
    }

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordInputsBox, setPasswordInputsBox] = useState(false);
    const [errors, setErrors] = useState({});
    const [pswConfirmationError, setPswConfirmationError] = useState(false);

    const handleBlur = (e) => {
        console.log("e.target.id: ", e.target.id);
        console.log("password: ", password);
        console.log("e.target.value: ", e.target.value);
        //estraggo il nome dell'input ed il suo valore
        const { id, name, value } = e.target;
        //creo nuovo oggetto ogni volta per rimuovere errori precedenti
        let newErrObj = { ...errors };

        delete newErrObj[name];
        setErrors(newErrObj);

        //validate
        if (value !== "") {
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
        }
    };

    const submitHandler = async (e) => {
        setPswConfirmationError(false);

        e.preventDefault();

        if (Object.keys(errors).length === 0) {
            if (password !== confirmPassword) {
                // alert("The password doesnt match!");
                setPswConfirmationError("The password doesnt match!");
                return;
            }

            try {
                const { data } = await axios.put(
                    "/api/users/profile",
                    {
                        id: userInfo.id,
                        name,
                        email,
                        password,
                    },
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    }
                );
                // dispatch({ type: "USER_REGISTER", payload: data });
                dispatch(userRegister(data));
                Cookies.set("userInfo", JSON.stringify(data));
                // alert("succesfull Registration!");
            } catch (err) {
                console.log("error:", err);
                alert(
                    err.response.data ? err.response.data.message : err.message
                );
                //if error show allert
            }
        } else {
            console.log("INVALID INPUTS", errors);
            return;
        }
    };

    return (
        <main id={styles["Profile"]}>
            <div>
                <h1>Il tuo profilo</h1>

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
                    {passwordInputsBox ? (
                        <>
                            <div className={styles["filter-form-col-right"]}>
                                <input
                                    type="password"
                                    name="password"
                                    id="Password"
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
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
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                                {pswConfirmationError && (
                                    <div className={"form-error"}>
                                        {pswConfirmationError}
                                    </div>
                                )}
                            </div>
                            <span
                                onClick={() => (
                                    setPasswordInputsBox(false), setPassword("")
                                )}
                            >
                                Annulla
                            </span>
                        </>
                    ) : (
                        <p onClick={() => setPasswordInputsBox(true)}>
                            Modifica
                        </p>
                    )}

                    <div className={styles["filter-form-col-full"]}>
                        <Button
                            text="Salva modifiche"
                            type="submit"
                            style="inverted-btn"
                        />
                    </div>
                </form>

                <section>
                    {userInfo && (
                        <>
                            <h3>ID: {userInfo.id}</h3>
                            <h3>Nome: {userInfo.name}</h3>
                            <h3>Email: {userInfo.email}</h3>
                        </>
                    )}
                    {/* <h3>Foto: {userInfo.profile_pic_url}</h3> */}
                </section>

                <Button
                    page="/ordini"
                    text="Vedi i tuoi ordini"
                    type="internal"
                    style="inverted-btn"
                />
            </div>
        </main>
    );
}

export default dynamic(() => Promise.resolve(Profile), { ssr: false });

//il bluerhandler si deve attivare solo se ho inserito qualche valore nell'input
// probabilmente faccio il check dei valori da passare a db in api
// devo inoltre chiedere la vecchia password per aggiornare quella nuova (opzionale)
// devo fare vedere le info attuali
