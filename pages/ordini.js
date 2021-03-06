import axios from "axios";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Link from "next/link";
import { shallowEqual, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import styles from "../components/Profile/style/Profile.module.css";
import { formatDateShort } from "../shared/utils/convertTimestamp";

const loggedUser = (state) => state.user.userInfo;

function UserAllOrders() {
    let userInfo = useSelector(loggedUser, shallowEqual);
    const router = useRouter();
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
                const { data } = await axios.get(`/api/orders/history`, {
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
        <div>
            <h1>Tutti gli ordini</h1>

            <p>Ordina per</p>
            <select
                defaultValue={"date asc"}
                onChange={(e) =>
                    setFilters({ ...filters, order: e.target.value })
                }
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

            <p>Trova utente o utente id</p>
            <input
                type="text"
                onChange={(e) =>
                    setFilters({
                        ...filters,
                        research: e.target.value.toLowerCase(),
                    })
                }
            ></input>

            <div>
                <div className={styles["user-order-head"]}>
                    <h4>ID</h4>
                    <h4>Importo</h4>
                    <h4>Data</h4>
                    <h4>Stato</h4>
                    <h4>Consegna</h4>
                    <h4>Azione</h4>
                    {/* <h4>Consegna</h4> */}
                </div>

                {displayedOrders &&
                    displayedOrders.map((order) => (
                        <div
                            key={order.order_id}
                            className={styles["user-order-box"]}
                        >
                            <p>#{order.order_id}</p>
                            <p>{order.total_price}???</p>
                            <p>{formatDateShort(order.created_at)}</p>
                            {order.is_paid ? (
                                <>
                                    <p>pagato ({order.payment_method})</p>
                                </>
                            ) : (
                                <p>non pagato</p>
                            )}
                            <p>
                                {order.is_delivered
                                    ? "consegnato"
                                    : "non consegnato"}
                            </p>

                            <Link href={`/ordine/${order.order_id}`}>
                                <a>
                                    <button>Visualizza</button>
                                </a>
                            </Link>
                        </div>
                    ))}
            </div>

            <Link href="/profilo">
                <a>
                    <h5>Torna indietro</h5>
                </a>
            </Link>
        </div>
    );
}

export default dynamic(() => Promise.resolve(UserAllOrders), { ssr: false });
