import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../../components/AdminDashboard/style/AdminDashboard.module.css";
import { formatDateShort } from "../../shared/utils/convertTimestamp";
import Button from "../../components/Button/Button";
import useWindowDimensions from "../../shared/utils/useWindowDimensions";

const loggedUser = (state) => state.user.userInfo;

function AdminAllOrders() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
    const { width } = useWindowDimensions();
    const [allOrders, setAllOrders] = useState([]);
    const [displayedOrders, setDisplayedOrders] = useState([]);
    const [filters, setFilters] = useState({
        research: "",
        order: "date asc",
    });

    useEffect(() => {
        if (!userInfo) {
            router.push("/login");
        }
        if (!userInfo.is_admin) {
            router.push("/");
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

    useEffect(() => {
        let source = allOrders;
        let matchResults = [];

        if (filters.research === "") {
            matchResults = allOrders;
        } else {
            source.filter((order) => {
                if (
                    order.shipping_address.fullName
                        .toLowerCase()
                        .indexOf(filters.research) === 0 ||
                    order.user_id.toString().indexOf(filters.research) === 0
                ) {
                    matchResults.push(order);
                }
            });
        }

        matchResults.length &&
            (filters.order === "date asc" &&
                matchResults.sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                ),
            filters.order === "date disc" &&
                matchResults.sort(
                    (a, b) => new Date(b.created_at) - new Date(a.created_at)
                ),
            filters.order === "price asc" &&
                matchResults.sort((a, b) =>
                    Number(a.total_price) > Number(b.total_price) ? 1 : -1
                ),
            filters.order === "price disc" &&
                matchResults.sort((a, b) =>
                    Number(b.total_price) > Number(a.total_price) ? 1 : -1
                ),
            filters.order === "id asc" &&
                matchResults.sort((a, b) =>
                    Number(a.order_id) > Number(b.order_id) ? 1 : -1
                ),
            filters.order === "id disc" &&
                matchResults.sort((a, b) =>
                    Number(b.order_id) > Number(a.order_id) ? 1 : -1
                ),
            filters.order === "delivered" &&
                (matchResults = matchResults.filter((el) => el.is_delivered)), //filter doesnt mutate original array
            filters.order === "not delivered" &&
                (matchResults = matchResults.filter((el) => !el.is_delivered)),
            setDisplayedOrders([...matchResults]));
    }, [filters, allOrders]);

    return (
        <div id={styles["AdminComponent"]}>
            <h1 className={styles["heading"]}>Tutti gli ordini</h1>

            <div>
                <select
                    defaultValue={"date asc"}
                    onChange={(e) =>
                        setFilters({ ...filters, order: e.target.value })
                    }
                    className={styles["admin-filter"]}
                >
                    <option value={"date asc"}>Data (ascendente)</option>
                    <option value={"date disc"}>Data (discendente)</option>
                    <option value={"price asc"}>Importo (ascendente)</option>
                    <option value={"price disc"}>Importo (discendente)</option>
                    <option value={"id asc"}>ID (ascendente)</option>
                    <option value={"id disc"}>ID (discendente)</option>
                    <option value={"delivered"}>Consegnati</option>
                    <option value={"not delivered"}>Da consegnare</option>
                </select>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Trova utente o utente id"
                    onChange={(e) =>
                        setFilters({
                            ...filters,
                            research: e.target.value.toLowerCase(),
                        })
                    }
                    className={styles["admin-filter"]}
                ></input>
            </div>

            <div className={styles["table"]}>
                <div className={styles["admin-order-head"]}>
                    <h4>ID</h4>
                    <h4>Utente</h4>
                    <h4>Importo</h4>
                    {width > 950 && (
                        <>
                            <h4>Stato</h4>
                            <h4>Data</h4>
                            <h4>Consegna</h4>
                        </>
                    )}
                    <h4>Azione</h4>
                    {/* <h4>Consegna</h4> */}
                </div>

                {displayedOrders &&
                    displayedOrders.map((order) => (
                        <div
                            key={order.order_id}
                            className={styles["admin-order-box"]}
                        >
                            <p>#{order.order_id}</p>
                            <p>{order.user_id}</p>
                            <p>{order.total_price}€</p>
                            {width > 950 && (
                                <>
                                    {order.is_paid ? (
                                        <>
                                            <p>
                                                pagato ({order.payment_method})
                                            </p>
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
                                </>
                            )}
                            <Link href={`/admin/ordine/${order.order_id}`}>
                                <a>
                                    <h5 className={styles["go-to-btn"]}>
                                        Visualizza
                                    </h5>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>

            <div className={styles["buttons-box"]}>
                <Button
                    page="/admin/dashboard"
                    text="Torna indietro"
                    type="internal"
                />
            </div>
        </div>
    );
}

export default dynamic(() => Promise.resolve(AdminAllOrders), { ssr: false });
