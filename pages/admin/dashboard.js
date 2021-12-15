import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect } from "react";

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

    // const [{ loading, error, summary }, dispatch] = useReducer(reducer, {
    //     loading: true,
    //     summary: { salesData: [] },
    //     error: "",
    // });

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        const fetchData = async () => {
            try {
                // dispatch({ type: "FETCH_REQUEST" });
                const { data } = await axios.get(`/api/admin/summary`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                // dispatch({ type: "FETCH_SUCCESS", payload: data });
            } catch (err) {
                // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <h1>Pannello amministratore</h1>

            <h3>Bentornato/a {userInfo.name}</h3>

            <Link href="/admin/ordini">
                <a>
                    <li>Vedi tutti gli ordini</li>
                </a>
            </Link>
            <Link href="/admin/utenti">
                <a>
                    <li>Vedi tutti gli utenti</li>
                </a>
            </Link>
            <Link href="/admin/prodotti">
                <a>
                    <li>Vedi/modifica i prodotti</li>
                </a>
            </Link>
            <Link href="/admin/dati">
                <a>
                    <li>Rendimento del sito</li>
                </a>
            </Link>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AdminDashboard), { ssr: false });

/*
In questa pagina sarebbe bello avere dei pannelli (preview) per ogni sezione
invece della lista di links
*/
