import Link from "next/link";
import { useEffect, useState } from "react";
import { selectUserState } from "@/redux/slices/userSlice";
import { shallowEqual, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { formatDateEU, formatDateWithTimeEU } from "@/utils/convertTimestamp";
import Head from "next/head";

export default function Ordini() {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    let userInfo = useSelector(selectUserState);
    const [orders, setOrders] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        fetchData();
    }, []);

    //================================================================================
    // API
    //================================================================================
    const fetchData = async () => {
        try {
            const { data } = await axios.get(`/api/get/all-orders`, {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });

            setOrders(data);
        } catch (err) {
            console.log("ERROR!", err);
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main>
            <Head>
                <title>I tuoi ordini • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="I tuoi ordini • Da Mamy a Mamy"
                />
            </Head>
            <section className="page">
                <h1>Tutti i tuoi ordini</h1>
                <div className="list" id="OrdersList">
                    {orders ? (
                        orders.length ? (
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
                                        href={`/ordine/${el.order_uuid}`}
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
                            <p className="center">Nessun ordine</p>
                        )
                    ) : (
                        <p className="center">Caricamento...</p>
                    )}
                </div>
            </section>
        </main>
    );
}
