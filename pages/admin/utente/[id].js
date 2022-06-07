//api fetch utente
//no ssr
//scheda utente

import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Store } from "../../utils/Store";
import { useSnackbar } from "notistack";
import { getError } from "../../../shared/utils/error";
import axios from "axios";

import styles from "../../../components/AdminDashboard/style/AdminDashboard.module.css";

import { formatJSDate } from "../../../shared/utils/convertTimestamp";

import { shallowEqual, useSelector } from "react-redux";
const loggedUser = (state) => state.user.userInfo;

function AdminUser({ params }) {
    const userId = Number(params.id);
    const router = useRouter();
    let userInfo = useSelector(loggedUser, shallowEqual);

    const { enqueueSnackbar } = useSnackbar();

    const [user, setUser] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        if (!userInfo.is_admin) {
            router.push("/");
        }

        const fetchUser = async () => {
            try {
                const { data } = await axios.get(`/api/users/${userId}`, {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                });
                setUser(data);
            } catch (err) {
                setError(getError(err));
                enqueueSnackbar(getError(err), { variant: "error" });
            }
        };

        fetchUser();
    }, []);

    const makeUserAdmin = async (bool) => {
        try {
            const { data } = await axios.post(
                `/api/users/${userId}/upgrade`,
                { newStatus: bool },
                {
                    headers: {
                        authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            setUser(data.user);
        } catch (err) {
            enqueueSnackbar(getError(err), { variant: "error" });
        }
    };

    console.log("user:", user);
    return (
        <div
            id={styles["AdminComponent"]}
            className={styles["dashboard-sub-component"]}
        >
            <Link href={`/admin/utenti`}>
                <a>
                    <h5 className={styles["filter-form-small-btn"]}>
                        🠔 Torna indietro
                    </h5>
                </a>
            </Link>

            {!user ? (
                <h3>Loading...</h3>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <div>
                    <h1>Dati utente: ID#{user.id}</h1>
                    <p>Nome: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Registrato il: {formatJSDate(user.created_at)}</p>
                    <p>
                        Autorizzazione:{" "}
                        {user.is_admin ? "Amministratore" : "Utente"}
                    </p>

                    {user.is_admin ? (
                        <button onClick={() => makeUserAdmin(false)}>
                            Revoca ruolo Admin
                        </button>
                    ) : (
                        <button onClick={() => makeUserAdmin(true)}>
                            Rendi Admin
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}
export default dynamic(() => Promise.resolve(AdminUser), { ssr: false });
