import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { shallowEqual, useSelector } from "react-redux";
import { selectUserState } from "@/redux/slices/userSlice";
import styles from "@/styles/Admin.module.css";
import { getError } from "@/utils/error";
import { checkUser } from "@/utils/custom/checks";

function Admin() {
    const router = useRouter();
    let userInfo = useSelector(selectUserState, shallowEqual);

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setIsAdmin(false);
        handleAuth(userInfo);
    }, [userInfo]);

    const handleAuth = async () => {
        let res = await checkUser(userInfo);
        if (res) {
            setIsAdmin(true);
        } else {
            router.push("/");
        }
    };
    return (
        <main>
            <section className="page">
                <h1>Area Admin</h1>
                <div className={styles.adminHomeWrap}>
                    {isAdmin ? (
                        <>
                            <Link href="/admin/nuovo" className={styles.link}>
                                <div>
                                    <h4>Aggiungi prodotto</h4>
                                </div>
                            </Link>
                            <Link
                                href="/admin/articoli"
                                className={styles.link}
                            >
                                <h4>Vedi tutti i prodotti</h4>
                                {/* <p>{summary.productsCount} prodotti in vendita</p> */}
                                {/* <p>{"?"} prodotti acquistati</p> */}
                            </Link>
                            <Link href="/admin/ordini" className={styles.link}>
                                <div>
                                    <h4>Vedi tutti gli ordini</h4>
                                    {/* <p>{summar  y.ordersCount} ordini in totale</p> */}
                                </div>
                            </Link>
                            <Link href="/admin/utenti" className={styles.link}>
                                <div>
                                    <h4>Vedi tutti gli utenti</h4>
                                    {/* <p>{summary.usersCount} utenti iscritti</p> */}
                                    {/* <p>{"?"} utenti sono admin</p> */}
                                </div>
                            </Link>
                            <Link
                                href="/admin/crea-admin"
                                className={`${styles.disabledLink} ${styles.link}`}
                            >
                                <div>
                                    <h4>Crea nuovo admin</h4>
                                    <p>Disabilitato per ragioni di sicurezza</p>
                                </div>
                            </Link>
                            <Link
                                href="/admin/statistiche"
                                className={`${styles.disabledLink} ${styles.link}`}
                            >
                                <div>
                                    <h4>Rendimento del sito</h4>
                                    <p>Sezione al momento non disponibile</p>
                                    {/* <p>Totale ordini: {summary.ordersPrice}€</p>
                            <p>Totale ordini di oggi: {"?"}€</p>
                            <p>Totale ordini di questo mese: {"?"}€</p> */}
                                </div>
                            </Link>
                        </>
                    ) : (
                        <p>Caricamento...</p>
                    )}
                </div>
            </section>
        </main>
    );
}

export default dynamic(() => Promise.resolve(Admin), { ssr: false });
