"use client";

import styles from "./page.module.css";
// import { useAppSelector } from "@/redux/lib/hooks";
// import { selectUserState } from "@/redux/slices/userSlice";
// import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logout } from "@/services/auth";

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
                        <p>• Aggiungi prodotto</p>
                        <p>• Modifica prodotti</p>
                        <p>• Aggiungi utente</p>
                        <button onClick={handleLogout} className="">
                            Logout
                        </button>
                    </section>
                )}
            </main>
        </div>
    );
}
