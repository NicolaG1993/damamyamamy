import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";

import styles from "@/components/Forms/Form.module.css";
import { checkUser } from "@/utils/custom/checks";
import { getError } from "@/utils/error";
import { selectUserState } from "@/redux/slices/userSlice";

export default function CreaAdmin() {
    const router = useRouter();
    let userInfo = useSelector(selectUserState, shallowEqual);
    const [isAdmin, setIsAdmin] = useState(false);
    const [userID, setUserID] = useState();
    const [success, setSuccess] = useState();

    useEffect(() => {
        setIsAdmin(false);
        handleAuth(userInfo);
    }, [userInfo]);

    const handleAuth = async () => {
        let res = await checkUser(userInfo);
        if (res) {
            setIsAdmin(true);
        } else {
            router.push("/");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post("/api/admin/new-admin", {
                id: userID,
            });
            // setUserID();
            setSuccess(data);
        } catch (err) {
            alert(getError(err));
        }
    };

    return (
        <main>
            <section className="page">
                <h1>Crea nuovo admin</h1>
                {isAdmin ? (
                    <form
                        className={styles.form}
                        onSubmit={(e) => handleSubmit(e)}
                    >
                        <div className={styles.inputWrap}>
                            <input
                                type="number"
                                placeholder="ID Utente*"
                                name="id"
                                id="ID"
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}
                            />
                        </div>
                        <div className={styles.buttonWrap}>
                            <button
                                type="submit"
                                disabled={userID ? false : true}
                                // className="button form-button"
                                className={`${
                                    userID
                                        ? "button form-button"
                                        : "button-disabled form-button"
                                }`}
                            >
                                Autorizza
                            </button>
                        </div>
                    </form>
                ) : (
                    <p>Caricamento...</p>
                )}

                {success && (
                    <div className="success">
                        <div onClick={() => setSuccess()}>X</div>
                        <div>
                            <p>
                                <strong>
                                    {success.first_name} {success.last_name}
                                </strong>
                                {` é diventato Admin`}
                            </p>
                        </div>
                    </div>
                )}
            </section>
        </main>
    );
}
