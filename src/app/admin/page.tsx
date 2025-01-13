"use client";

import styles from "./page.module.css";
// import { useAppSelector } from "@/redux/lib/hooks";
// import { selectUserState } from "@/redux/slices/userSlice";
// import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";
import Link from "next/link";

export default function Admin() {
    const router = useRouter();
    // const userInfo = useAppSelector(selectUserState);

    // useEffect(() => {
    //     if (!userInfo?.isAdmin) {
    //         router.push("/admin/login");
    //     }
    // }, [userInfo]);

    const handleLogout = async () => {
        try {
            await logout();
            console.log("User logged out successfully");
            router.push("/admin/login"); // Redirect to the login page
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <div className={"page"}>
            <main>
                {!router ? (
                    <section>
                        <div>Attendi...</div>
                    </section>
                ) : (
                    <section>
                        <h1>Area amministratore</h1>

                        <div className={styles.adminNav}>
                            <Link href={"/admin/crea-cliente"}>
                                Aggiungi cliente
                            </Link>
                            <Link href={"/admin/crea-prodotto"}>
                                Aggiungi prodotto
                            </Link>
                            <Link href={"/admin/crea-utente"}>
                                Aggiungi utente autorizzato
                            </Link>
                            <Link href={"/admin/prodotti"}>Lista clienti</Link>
                            <Link href={"/admin/prodotti"}>Lista prodotti</Link>
                            <Link href={"/admin/utenti"}>
                                Lista utenti autorizzati
                            </Link>
                        </div>
                        <button onClick={handleLogout} className="">
                            Logout
                        </button>
                    </section>
                )}
            </main>
        </div>
    );
}
