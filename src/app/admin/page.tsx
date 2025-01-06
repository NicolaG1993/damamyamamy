"use client";

import styles from "./page.module.css";
import { useAppSelector } from "@/redux/lib/hooks";
import { selectUserState } from "@/redux/slices/userSlice";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Admin() {
    const router = useRouter();
    const userInfo = useAppSelector(selectUserState);

    useEffect(() => {
        if (!userInfo?.isAdmin) {
            router.push("/");
        }
    }, [userInfo]);

    if (!router || userInfo === undefined) {
        return <div>Loading...</div>;
    }

    return (
        <div className={"page"}>
            <main>
                <section>
                    <h1>Area amministratore</h1>
                    <p>• Aggiungi prodotto</p>
                    <p>• Modifica prodotti</p>
                </section>
            </main>
        </div>
    );
}
