import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../../components/AdminDashboard/style/AdminDashboard.module.css";
import { formatDateShort } from "../../shared/utils/convertTimestamp";

const loggedUser = (state) => state.user.userInfo;

function AdminAllUsers() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
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
        <div>
            <h1>Tutti gli utenti</h1>

            <div>
                <div className={styles["admin-user-head"]}>
                    <h4>ID</h4>
                    <h4>Nome</h4>
                    <h4>Email</h4>
                    <h4>Account</h4>
                    {/* <h4>Autorizzazione</h4> */}
                    <h4>Data registrazione</h4>
                    <h4>Azione</h4>
                    {/* <h4>Consegna</h4> */}
                </div>

                {allUsers &&
                    allUsers.map((user) => (
                        <div key={user.id} className={styles["admin-user-box"]}>
                            <p>#{user.id}</p>
                            <p>{user.name}</p>
                            <p>{user.email}</p>

                            {user.is_admin ? <p>Admin</p> : <p>Utente</p>}
                            <p>{formatDateShort(user.created_at)}</p>

                            <Link href={`/admin/utente/${user.id}`}>
                                <a>
                                    <button>Visualizza</button>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>

            <Link href="/admin/dashboard">
                <a>Torna indietro</a>
            </Link>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AdminAllUsers), { ssr: false });
