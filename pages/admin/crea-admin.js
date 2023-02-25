import styles from "@/components/Forms/Form.module.css";
import { getError } from "@/utils/error";
import axios from "axios";
import { useEffect, useState } from "react";
import { checkAdmin } from "@/utils/custom/checks";
import { useRouter } from "next/router";
import { shallowEqual, useSelector } from "react-redux";
import { selectUserState } from "@/redux/slices/userSlice";

export default function CreaAdmin() {
    const router = useRouter();
    let userInfo = useSelector(selectUserState, shallowEqual);

    const [userID, setUserID] = useState();
    const [success, setSuccess] = useState();

    useEffect(() => {
        try {
            if (!userInfo) {
                router.push("/login");
            } else if (!checkAdmin(userInfo)) {
                router.push("/");
            }
        } catch (err) {
            router.push("/");
            alert(getError(err));
        }
    }, []);

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
                <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
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
