import Link from "next/link";
import styles from "@/styles/Admin.module.css";

export default function Admin() {
    // if (!userInfo) {
    //     console.log("user is not logged in");
    //     router.push("/login");
    // } else if (userInfo && !userInfo.is_admin) {
    //     console.log("user is not Admin");
    //     router.push("/");
    // }

    return (
        <main>
            <section className="page">
                <h1>Area Admin</h1>
                <div className={styles.adminHomeWrap}>
                    <Link href={"/admin/nuovo"}>
                        <div>
                            <h4>Aggiungi prodotto</h4>
                        </div>
                    </Link>
                    <Link href="/admin/prodotti">
                        <h4>Vedi tutti i prodotti</h4>
                        {/* <p>{summary.productsCount} prodotti in vendita</p> */}
                        <p>{"?"} prodotti acquistati</p>
                    </Link>
                    <Link href="/admin/ordini">
                        <div>
                            <h4>Vedi tutti gli ordini</h4>
                            {/* <p>{summar  y.ordersCount} ordini in totale</p> */}
                        </div>
                    </Link>
                    <Link href="/admin/utenti">
                        <div>
                            <h4>Vedi tutti gli utenti</h4>
                            {/* <p>{summary.usersCount} utenti iscritti</p> */}
                            <p>{"?"} utenti sono admin</p>
                        </div>
                    </Link>
                    <Link href="/admin/crea-admin">
                        <div>
                            <h4>Rendi utente admin</h4>
                        </div>
                    </Link>
                    <Link href="/admin/statistiche">
                        <div>
                            <h4>Rendimento del sito</h4>
                            <p>Sezione al momento non disponibile</p>
                            {/* <p>Totale ordini: {summary.ordersPrice}€</p>
                            <p>Totale ordini di oggi: {"?"}€</p>
                            <p>Totale ordini di questo mese: {"?"}€</p> */}
                        </div>
                    </Link>
                </div>
            </section>
        </main>
    );
}
