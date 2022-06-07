// api fetch ordine
// no ssr
// rifare component

import dynamic from "next/dynamic";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
// import { Store } from "../../utils/Store";
import { useSnackbar } from "notistack";
import { getError } from "../../shared/utils/error";
import axios from "axios";

import styles from "../../components/AdminDashboard/style/AdminDashboard.module.css";

import { formatJSDate } from "../../shared/utils/convertTimestamp";

import { shallowEqual, useSelector } from "react-redux";
const loggedUser = (state) => state.user.userInfo;

function Order({ params }) {
    const orderId = Number(params.id);
    const router = useRouter();
    let userInfo = useSelector(loggedUser, shallowEqual);

    const { enqueueSnackbar } = useSnackbar();

    const [order, setOrder] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        if (!userInfo.is_admin) {
            router.push("/");
        }

        // in questo file fare check di tutte le keys id, orderId, _id
        const fetchOrder = async () => {
            try {
                const { data } = await axios.get(`/api/orders/${orderId}`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                console.log("data:", data);
                setOrder(data);
            } catch (err) {
                setError(getError(err));
                enqueueSnackbar(getError(err), { variant: "error" });
            }
        };

        fetchOrder();
    }, []);

    console.log("order:", order);

    return (
        <div className={styles["dashboard-sub-component"]}>
            <Link href={`/ordini`}>
                <a>
                    <h5>Torna indietro</h5>
                </a>
            </Link>
            <h1>Dettagli ordine: #{orderId}</h1>

            {!order ? (
                <h3>Loading...</h3>
            ) : error ? (
                <h3>{error}</h3>
            ) : (
                <section className={styles["order-section"]}>
                    <div>
                        <div>
                            <h2>Utente</h2>
                            <p>ID: #{order.user_id}</p>
                            <p>Nome: {order.name}</p>
                            <p>E-mail: {order.email}</p>
                        </div>

                        <div>
                            <h2>Indirizzo</h2>
                            <p>
                                {order.shipping_address.fullName},{" "}
                                {order.shipping_address.address},{" "}
                                {order.shipping_address.city},{" "}
                                {order.shipping_address.postalCode},{" "}
                                {order.shipping_address.country}
                            </p>
                            <p>
                                Status:{" "}
                                {order.is_delivered
                                    ? `consegnato il ${formatJSDate(
                                          order.delivered_at
                                      )}`
                                    : `non ancora consegnato`}
                            </p>
                        </div>

                        <div>
                            <h2>Metodo di pagamento</h2>
                            <p>{order.payment_method}</p>
                            <p>
                                Status:{" "}
                                {order.is_paid
                                    ? `pagato il ${formatJSDate(order.paid_at)}`
                                    : `non pagato`}
                            </p>
                        </div>

                        <div>
                            <h2>Articoli ordinati</h2>
                            <div>
                                <div className={styles["grid-table-headings"]}>
                                    <h4>Immagine</h4>
                                    <h4>Nome</h4>
                                    <h4>Quantità</h4>
                                    <h4>Prezzo</h4>
                                </div>
                                {order.order_items.map((el) => (
                                    <div
                                        key={el.itemId}
                                        className={
                                            styles["order-table-product"]
                                        }
                                    >
                                        <div>
                                            <Link href={`/product/${el.slug}`}>
                                                <a>
                                                    <div
                                                        style={{
                                                            position:
                                                                "relative",
                                                            height: "50px",
                                                            width: "50px",
                                                        }}
                                                    >
                                                        <Image
                                                            src={
                                                                el.image ||
                                                                "/pics/Logo.jpg"
                                                            }
                                                            alt={el.name}
                                                            layout="fill"
                                                            objectFit="cover"
                                                        />
                                                    </div>
                                                </a>
                                            </Link>

                                            <Link href={`/product/${el.slug}`}>
                                                <a>
                                                    <h4>{el.name}</h4>
                                                </a>
                                            </Link>

                                            <p>{el.quantity}</p>
                                            <p>{el.price} €</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div>
                        <div className={styles["flex-paragraph"]}>
                            <p>Articoli:</p> <p>{order.items_price} €</p>
                        </div>
                        <div className={styles["flex-paragraph"]}>
                            <p>Tasse:</p> <p>{order.tax_price} €</p>
                        </div>
                        <div className={styles["flex-paragraph"]}>
                            <p>Spedizione:</p> <p>{order.shipping_price} €</p>
                        </div>
                        <div className={styles["flex-paragraph"]}>
                            <h4>Totale:</h4> <h4>{order.total_price} €</h4>
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
}

export async function getServerSideProps({ params }) {
    return { props: { params } };
}
export default dynamic(() => Promise.resolve(Order), { ssr: false });
