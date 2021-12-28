import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import Cookies from "js-cookie";
import { useSnackbar } from "notistack";
import { getError } from "../shared/utils/error";
import styles from "../shared/styles/Login.module.css";

// REDUX
import { userLogin } from "../redux/User/user.actions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import Button from "../components/Button/Button";
const selectUserInfo = (state) => state.user.userInfo;

export default function Login() {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const router = useRouter();
    const { redirect } = router.query;
    // redirect é una query che passiamo se vogliamo reindirizzare ad un'altra pagina invece di "home", tipo pag precedente
    // ad es. router.push("/login?redirect=/checkout");

    const dispatch = useDispatch();
    let userInfo = useSelector(selectUserInfo, shallowEqual);
    if (userInfo) {
        router.push("/");
    }

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [errors, setErrors] = useState(false);

    const submitHandler = async (e) => {
        e.preventDefault();
        closeSnackbar();

        try {
            const { data } = await axios.post("/api/users/login", {
                email,
                password,
            });
            dispatch(userLogin(data));
            Cookies.set("userInfo", JSON.stringify(data));
            // alert("succesfull Login!");
            router.push(redirect || "/");
        } catch (err) {
            // alert(err.response.data ? err.response.data.message : err.message);
            enqueueSnackbar(getError(err), { variant: "error" });

            //if error show allert
            // console.log("err:", err);
            // setError(err);
            //posso usare useState in alternativa e mostrare degli span vicino a gli inputs
        }
    };

    return (
        <main id={styles["Access"]}>
            <div>
                <h1>Login</h1>

                <form
                    className={styles["filter-form"]}
                    onSubmit={(e) => submitHandler(e)}
                >
                    <div className={styles["filter-form-col-left"]}>
                        <label>
                            <span>Email</span>
                        </label>
                    </div>
                    <div className={styles["filter-form-col-right"]}>
                        <input
                            type="text"
                            name="email"
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />
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
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <div className={styles["filter-form-col-full"]}>
                        <Button
                            text="Entra"
                            type="submit"
                            style="inverted-btn"
                        />
                    </div>
                </form>

                <p>
                    Non hai ancora un account?{" "}
                    <Link href={`/register?redirect=${redirect || "/"}`}>
                        <a>Registrati</a>
                    </Link>
                </p>
            </div>
        </main>
    );
}
