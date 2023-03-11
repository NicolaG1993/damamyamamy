import axios from "axios";
import { selectUserState } from "@/redux/slices/userSlice";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Order.module.css";
import { formatDateWithTimeEU } from "@/utils/convertTimestamp";

export default function Ordine() {
    // solo admin e matching user 🧠

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
    }, []);

    useEffect(() => {
        uuid && fetchData();
    }, [uuid]);

    //================================================================================
    // Functions
    //================================================================================

    //================================================================================
    // API
    //================================================================================
    const fetchData = async () => {
        if (uuid) {
            try {
                const { data } = await axios.get(`/api/get/order/${uuid}`);
                console.log("💚 order:", data);
                setOrder(data);
            } catch (err) {
                console.log("ERROR!", err);
                setError(err);
            }
        }
    };

    //================================================================================
    // Render UI
    //================================================================================
    return (
        <main>
            <section className="page" id={styles.Order}>
                <h1>Ordine</h1>
                <p>
                    # <span>{uuid}</span>
                </p>
                <Link href={"/profilo/ordini"} className={styles.goBack}>
                    Torna indietro
                </Link>
                {order ? (
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
                                <p>{order.shipping_address.shippingOption}</p>
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
                ) : (
                    <div>Caricamento...</div>
                )}
            </section>
        </main>
    );
}
