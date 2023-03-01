import Image from "next/image";
import Link from "next/link";
import styles from "./ShopItems.module.css";
import Item from "./Item";

export default function ShopItems({ data }) {
    return (
        <div className={styles.shortListGrid}>
            {data ? (
                data.length ? (
                    data.map((el) => (
                        <Item item={el} key={"Shop item " + el.id} />
                    ))
                ) : (
                    <p>Nessun risultato disponibile</p>
                )
            ) : (
                <p>Caricamento...</p>
            )}
        </div>
    );
}
