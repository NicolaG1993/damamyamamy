import { getError } from "@/utils/error";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "@/styles/Shop.module.css";
import ShopItems from "@/components/Displayers/ShopItems/ShopItems";

export default function Negozio() {
    const [items, setItems] = useState();

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data } = await axios.get("/api/get/all-items");
            console.log("💚 data: ", data);
            setItems(data);
        } catch (err) {
            setItems();
            alert(getError(err));
        }
    };

    return (
        <main className={styles.main} id={styles["Shop"]}>
            <section className="page">
                <h1>Negozio</h1>
                <div>
                    <ShopItems data={items} />
                </div>
            </section>
        </main>
    );
}
