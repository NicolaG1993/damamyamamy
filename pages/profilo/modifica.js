import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { selectUserState, userLogin } from "@/redux/slices/userSlice";
import { nameValidation } from "@/utils/validateForms";
import styles from "@/components/Forms/Form.module.css";
import { getError } from "@/utils/error";
import Head from "next/head";

export default function Modifica() {
    //================================================================================
    // Component State
    //================================================================================
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [errors, setErrors] = useState({});
    const router = useRouter();
    let userInfo = useSelector(selectUserState, shallowEqual);
    const dispatch = useDispatch();

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
                console.log("nameValidation:", resp);
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
                const { data } = await axios.post(
                    "/api/auth/edit",
                    {
                        firstName,
                        lastName,
                    },
                    {
                        headers: { authorization: `Bearer ${userInfo.token}` },
                    }
                );
                dispatch(userLogin(data)); //maybe just update is better
                router.push("/profilo");
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
            <Head>
                <title>Modifica profilo • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Modifica profilo • Da Mamy a Mamy"
                />
            </Head>
            <section className="page">
                <h1>Modifica profilo</h1>
                <Link href={"/profilo"} className="back-link">
                    Torna indietro
                </Link>
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
                    <div className={styles.buttonWrap}>
                        <button type="submit" className="button form-button">
                            Conferma modifiche
                        </button>
                    </div>
                </form>
            </section>
        </main>
    );
}
