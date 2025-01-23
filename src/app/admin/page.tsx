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

    const handleLogout = async () => {
        try {
            await logout();
            console.log("User logged out successfully");
            router.push("/admin/login");
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
                            <Link href={"/admin/clienti/crea"}>
                                Aggiungi cliente
                            </Link>
                            <Link href={"/admin/articoli/crea"}>
                                Aggiungi articolo
                            </Link>
                            <Link href={"/admin/utenti/crea"}>
                                Aggiungi utente autorizzato
                            </Link>
                            <Link href={"/admin/clienti"}>Lista clienti</Link>
                            <Link href={"/admin/articoli"}>Lista articoli</Link>
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
