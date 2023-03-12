import axios from "axios";
import { selectUserState } from "@/redux/slices/userSlice";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Order.module.css";
import { formatDateWithTimeEU } from "@/utils/convertTimestamp";
import { getError } from "@/utils/error";
import Head from "next/head";

export default function Ordine() {
    //================================================================================
    // Component State
    //================================================================================
    const router = useRouter();
    const { uuid } = router.query;
    let userInfo = useSelector(selectUserState);
    const [order, setOrder] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        if (!userInfo.is_admin) {
            router.push("/");
        }
    }, []);

    useEffect(() => {
        uuid && fetchData();
    }, [uuid]);

    //================================================================================
    // API
    //================================================================================
    const fetchData = async () => {
        if (uuid) {
            try {
                const { data } = await axios.get(`/api/get/order/${uuid}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                console.log("💚 order:", data);
                setOrder(data);
            } catch (err) {
                console.log("ERROR!", err);
                setError(err);
            }
        }
    };

    const confirmShipping = async () => {
        try {
            const { data } = await axios.post(
                `/api/admin/confirm-shipping`,
                { uuid },
                {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                }
            );
            console.log("💚 order:", data);
            setOrder(data);
        } catch (err) {
            console.log("ERROR!", err);
            setError(err);
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main>
            <Head>
                <title>Admin • Ordine {uuid} • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content={`Admin • Ordine ${uuid} • Da Mamy a Mamy`}
                />
            </Head>
            <section className="page" id={styles.Order}>
                <h1>Ordine</h1>
                <p>
                    # <span>{uuid}</span>
                </p>
                <Link href={"/admin/lista/ordini"} className={styles.goBack}>
                    Torna indietro
                </Link>
                {error && (
                    <div className="error">
                        <p>{getError(error)}</p>
                    </div>
                )}
                {order ? (
                    <>
                        <div className={styles.orderWrap}>
                            <div>
                                <p>Stato ordine:</p>
                                <p>{order.is_paid ? "Pagato" : "Annullato"}</p>
                            </div>
                            <div>
                                <p>Metodo:</p>
                                <p>{order.payment_method}</p>
                            </div>
                            <div>
                                <p>Data:</p>
                                <p>{formatDateWithTimeEU(order.created_at)}</p>
                            </div>

                            <div>
                                <p>Indirizzo:</p>
                                <div>
                                    <p>{order.shipping_address.fullName}</p>
                                    <p>{order.shipping_address.address}</p>
                                    <p>
                                        {order.shipping_address.postalCode}
                                        {" - "}
                                        {order.shipping_address.city}
                                        {", "}
                                        {order.shipping_address.country}
                                    </p>
                                </div>
                            </div>

                            <div>
                                <p>Utente:</p>
                                <p>{`${userInfo.firstName} ${userInfo.lastName} (ID: #${order.user_id})`}</p>
                            </div>

                            <div>
                                <p>Consegnato:</p>
                                <p>{order.is_delivered ? "Sì" : "No"}</p>
                            </div>

                            <div>
                                <p>Articoli:</p>

                                <div className={styles.orderItems}>
                                    {order.order_items.map((item) => (
                                        <div
                                            key={item.id}
                                            className={styles.orderItem}
                                        >
                                            <p>• {item.name}</p>
                                            <p>€ {item.price}</p>
                                            <p>x {item.quantity}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <p>Costo articoli:</p>
                                <p>€ {order.items_price}</p>
                            </div>
                            <div>
                                <p>Spedizione:</p>
                                <div>
                                    <p>€ {order.shipping_price}</p>
                                    <p>
                                        {order.shipping_address.shippingOption}
                                    </p>
                                </div>
                            </div>
                            <div>
                                <p>Tasse:</p>
                                <p>€ {order.tax_price}</p>
                            </div>
                            <div>
                                <p>Totale:</p>
                                <p>€ {order.total_price}</p>
                            </div>
                        </div>

                        <div className="document-double-button-wrap">
                            <button
                                disabled={order.is_delivered}
                                className={
                                    order.is_delivered
                                        ? "button-disabled"
                                        : "button"
                                }
                                onClick={() => confirmShipping()}
                            >
                                Conferma avvenuta consegna
                            </button>
                            <button disabled className="button-disabled">
                                Annulla e rimborsa ordine
                            </button>
                        </div>
                    </>
                ) : (
                    <div>Caricamento...</div>
                )}
            </section>
        </main>
    );
}
