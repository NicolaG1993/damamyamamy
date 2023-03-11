import Link from "next/link";
import { useEffect, useState } from "react";
import { selectUserState } from "@/redux/slices/userSlice";
import { shallowEqual, useSelector } from "react-redux";
import { useRouter } from "next/router";
import axios from "axios";
import { formatDateEU, formatDateWithTimeEU } from "@/utils/convertTimestamp";

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
            console.log("💚🔍 data", data);
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
            <section className="page">
                <h1>Tutti i tuoi ordini</h1>
                <div className="list" id="OrdersList">
                    {orders ? (
                        orders.map((el) => (
                            <Link
                                key={el.order_uuid}
                                href={`/ordine/${el.order_uuid}`}
                                className="listItem"
                            >
                                <p># {el.order_uuid}</p>
                                <p>{formatDateEU(el.created_at)}</p>
                                <p>€ {el.total_price}</p>
                                <p>{el.is_paid ? "Confermato" : "Annullato"}</p>
                            </Link>
                        ))
                    ) : (
                        <p>Nessun ordine</p>
                    )}
                </div>
            </section>
        </main>
    );
}
