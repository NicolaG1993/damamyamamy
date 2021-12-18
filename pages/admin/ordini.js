import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../../components/AdminDashboard/style/AdminDashboard.module.css";
import { formatDateShort } from "../../shared/utils/convertTimestamp";

const loggedUser = (state) => state.user.userInfo;

function AdminAllOrders() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
    const [allOrders, setAllOrders] = useState([]);

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        const fetchData = async () => {
            try {
                const { data } = await axios.get(`/api/admin/orders`, {
                    headers: { authorization: `Bearer ${userInfo.token}` },
                });
                setAllOrders(data);
            } catch (err) {
                // dispatch({ type: "FETCH_FAIL", payload: getError(err) });
            }
        };
        fetchData();
    }, []);

    console.log("allOrders: ", allOrders);

    return (
        <div>
            <h1>Tutti gli ordini</h1>

            <div>
                <div className={styles["admin-order-head"]}>
                    <h4>ID</h4>
                    <h4>Utente</h4>
                    <h4>Importo</h4>
                    <h4>Stato</h4>
                    <h4>Data</h4>
                    <h4>Consegna</h4>
                    <h4>Azione</h4>
                    {/* <h4>Consegna</h4> */}
                </div>

                {allOrders &&
                    allOrders.map((order) => (
                        <div
                            key={order.order_id}
                            className={styles["admin-order-box"]}
                        >
                            <p>#{order.order_id}</p>
                            <p>{order.user_id}</p>
                            <p>{order.total_price}€</p>
                            {order.is_paid ? (
                                <>
                                    <p>pagato ({order.payment_method})</p>
                                </>
                            ) : (
                                <p>non pagato</p>
                            )}
                            <p>{formatDateShort(order.created_at)}</p>
                            <p>
                                {order.is_delivered
                                    ? "consegnato"
                                    : "non consegnato"}
                            </p>

                            <Link href={`/admin/ordine/${order.order_id}`}>
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

export default dynamic(() => Promise.resolve(AdminAllOrders), { ssr: false });
