import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { shallowEqual, useSelector } from "react-redux";

import { selectUserState } from "@/redux/slices/userSlice";
import { checkUser } from "@/utils/custom/checks";
import { getError } from "@/utils/error";
import Link from "next/link";
import Head from "next/head";

export default function Articoli() {
    const router = useRouter();
    let userInfo = useSelector(selectUserState);
    const [isAdmin, setIsAdmin] = useState(false);
    const [items, setItems] = useState();

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
            const { data } = await axios.get("/api/admin/all-items", {
                headers: { authorization: `Bearer ${userInfo.token}` },
            });

            setItems(data);
        } catch (err) {
            setItems();
            alert(getError(err));
        }
    };

    return (
        <main>
            <Head>
                <title>Admin • Articoli • Da Mamy a Mamy</title>
                <meta property="og:type" content="website" />
                <meta
                    property="og:title"
                    content="Admin • Articoli • Da Mamy a Mamy"
                />
            </Head>

            <section className="page">
                <h1>Tutti gli articoli</h1>
                <Link href={"/admin"} className="back-link">
                    Torna indietro
                </Link>
                <div className="list" id="ItemsList">
                    {isAdmin ? (
                        items && items.length ? (
                            <>
                                <div className="listHead">
                                    <p>ID</p>
                                    <p>Nome</p>
                                    <p>Prezzo</p>
                                    <p>Disponibilità</p>
                                    <p>Condizioni</p>
                                    <p>Azioni</p>
                                </div>
                                {items.map((item) => (
                                    <div
                                        key={"item " + item.id}
                                        className="listItem"
                                    >
                                        <p>{item.id}</p>
                                        <p>{item.name}</p>
                                        <p>€{item.price || "N/A"}</p>
                                        <p>{item.count_in_stock || 0}</p>
                                        <p>{item.condition || "N/A"}</p>
                                        <Link
                                            href={`/admin/modifica/articolo/${item.id}`}
                                        >
                                            📝
                                        </Link>
                                        <p className="action">❌</p>
                                    </div>
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
