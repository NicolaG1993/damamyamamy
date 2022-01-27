import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../../components/AdminDashboard/style/AdminDashboard.module.css";
import Button from "../../components/Button/Button";
import useWindowDimensions from "../../shared/utils/useWindowDimensions";

const loggedUser = (state) => state.user.userInfo;

function AdminSummary() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        if (!userInfo.is_admin) {
            router.push("/");
        }
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/admin/users`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                setAllUsers(data);
            } catch (err) {
                // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
            }
        };
        fetchData();
    }, []);

    console.log("allUsers: ", allUsers);

    return (
        <div id={styles["AdminComponent"]}>
            <h1 className={styles["heading"]}>Rendimento del sito</h1>

            <div className={styles["table"]}>
                <h3>Non ancora disponibile</h3>
            </div>

            <div className={styles["buttons-box"]}>
                <Button
                    page="/admin/dashboard"
                    text="Torna indietro"
                    type="internal"
                />
            </div>

            <h2>
                qui devo mettere grafici e statistiche relativi al rendimento
            </h2>
            <p>
                Sono sicuro che alcuni dati li posso ricevere da AWS o Google,
                tipo traffico, interazioni, ecc
            </p>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AdminSummary), { ssr: false });
