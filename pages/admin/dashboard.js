import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../../components/AdminDashboard/style/AdminDashboard.module.css";

// function reducer(state, action) {
//     switch (action.type) {
//         case "FETCH_REQUEST":
//             return { ...state, loading: true, error: "" };
//         case "FETCH_SUCCESS":
//             return {
//                 ...state,
//                 loading: false,
//                 summary: action.payload,
//                 error: "",
//             };
//         case "FETCH_FAIL":
//             return { ...state, loading: false, error: action.payload };
//         default:
//             state;
//     }
// }

const loggedUser = (state) => state.user.userInfo;

function AdminDashboard() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
    const [summary, setSummary] = useState({});

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        if (!userInfo.is_admin) {
            router.push("/");
        }
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/admin/summary`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                setSummary(data);
            } catch (err) {
                // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
            }
        };
        fetchData();
    }, []);

    console.log("summary: ", summary);

    return (
        <div className={styles["admin-dashboard"]}>
            <h1>Pannello amministratore</h1>

            <h3>Ciao, {userInfo.name}</h3>

            <section>
                <Link href="/admin/ordini">
                    <a>
                        <div>
                            <h4>Vedi tutti gli ordini</h4>
                            <p>{summary.ordersCount} ordini in totale</p>
                        </div>
                    </a>
                </Link>
                <Link href="/admin/utenti">
                    <a>
                        <div>
                            <h4>Vedi tutti gli utenti</h4>
                            <p>{summary.usersCount} utenti iscritti</p>
                            <p>{"?"} utenti sono admin</p>
                        </div>
                    </a>
                </Link>
                <Link href="/admin/prodotti">
                    <a>
                        <div>
                            <h4>Vedi/modifica i prodotti</h4>
                            <p>{summary.productsCount} prodotti in vendita</p>
                            <p>{"?"} prodotti acquistati</p>
                        </div>
                    </a>
                </Link>
                <Link href="/admin/statistiche">
                    <a>
                        <div>
                            <h4>Rendimento del sito</h4>
                            <p>Totale ordini: {summary.ordersPrice}€</p>
                            <p>Totale ordini di oggi: {"?"}€</p>
                            <p>Totale ordini di questo mese: {"?"}€</p>
                        </div>
                    </a>
                </Link>
            </section>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });

/*
In questa pagina sarebbe bello avere dei pannelli (preview) per ogni sezione
invece della lista di links
*/
