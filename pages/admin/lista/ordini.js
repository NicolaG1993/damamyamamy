import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";

import { selectUserState } from "@/redux/slices/userSlice";
import { checkUser } from "@/utils/custom/checks";
import { getError } from "@/utils/error";
import Link from "next/link";
import { formatDateEU } from "@/utils/convertTimestamp";
import Head from "next/head";

export default function Articoli() {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    let userInfo = useSelector(selectUserState);
    const [isAdmin, setIsAdmin] = useState(false);
    const [orders, setOrders] = useState();

    useEffect(() => {
        setIsAdmin(false);
        handleAuth(userInfo);
    }, [userInfo]);

    useEffect(() => {
        isAdmin && fetchData();
    }, [isAdmin]);

    const handleAuth = async () => {
        let res = await checkUser(userInfo);
        if (res) {
            setIsAdmin(true);
        } else {
            router.push("/");
        }
    };

    //================================================================================
    // API
    //================================================================================
    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/admin/all-orders", {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });
            setOrders(data);
        } catch (err) {
            setOrders();
            alert(getError(err));
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main>
            <Head>
                <title>Admin • Ordini • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Admin • Ordini • Da Mamy a Mamy"
                />
            </Head>
            <section className="page">
                <h1>Tutti gli ordini</h1>
                <Link href={"/admin"} className="back-link">
                    Torna indietro
                </Link>
                <div className="list" id="OrdersList">
                    {isAdmin ? (
                        orders && orders.length ? (
                            <>
                                <div className="listHead">
                                    <p>ID</p>
                                    <p>Data</p>
                                    <p>Importo</p>
                                    <p>Stato</p>
                                    <p>Consegnato</p>
                                </div>
                                {orders.map((el) => (
                                    <Link
                                        key={el.order_uuid}
                                        href={`/admin/vedi/ordine/${el.order_uuid}`}
                                        className="listItem"
                                    >
                                        <p># {el.order_uuid}</p>
                                        <p>{formatDateEU(el.created_at)}</p>
                                        <p>€ {el.total_price}</p>
                                        <p>
                                            {el.is_paid
                                                ? "Pagato"
                                                : "Annullato"}
                                        </p>
                                        <p>{el.is_delivered ? "Sì" : "No"}</p>
                                    </Link>
                                ))}
                            </>
                        ) : (
                            <p className="center">Nessun risultato</p>
                        )
                    ) : (
                        <p className="center">Caricamento...</p>
                    )}
                </div>
            </section>
        </main>
    );
}
