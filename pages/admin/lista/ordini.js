import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";

import { selectUserState } from "@/redux/slices/userSlice";
import { checkUser } from "@/utils/custom/checks";
import { getError } from "@/utils/error";

export default function Articoli() {
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

    return (
        <main>
            <section className="page">
                <h1>Tutti gli ordini</h1>
                <div className="list" id="ItemsList">
                    {isAdmin ? (
                        orders && orders.length ? (
                            <>
                                <div className="listHead"></div>
                                {orders.map((order) => (
                                    <div
                                        key={"order " + order.id}
                                        className="listItem"
                                    ></div>
                                ))}
                            </>
                        ) : (
                            <p>Nessun risultato</p>
                        )
                    ) : (
                        <p>Caricamento...</p>
                    )}
                </div>
            </section>
        </main>
    );
}
