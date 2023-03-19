import Image from "next/image";
import Link from "next/link";
import styles from "./ShopItems.module.css";
import Item from "./Item";

export default function ShopItems({ data }) {
    return (
        <>
            {data ? (
                data.length ? (
                    <div className={styles.shortListGrid}>
                        {data.map((el) => (
                            <Item item={el} key={"Shop item " + el.id} />
                        ))}
                    </div>
                ) : (
                    <p className="center">Nessun risultato disponibile</p>
                )
            ) : (
                <p className="center">Caricamento...</p>
            )}
        </>
    );
}
