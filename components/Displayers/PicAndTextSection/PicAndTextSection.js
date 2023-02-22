import Image from "next/image";
import Link from "next/link";
import styles from "./PicAndTextSection.module.css";

export default function PicAndTextSection({ item }) {
    // voglio che in home cerci il prodotto con il prezzo piu basso, negli ultimi 10-20 inseriti
    let { title, price, id } = item;
    return (
        <section id={styles.PicAndTextSection}>
            <div></div>
            <div>
                <p>Occasione</p>
                <p>{title}</p>
                <p>€{price}</p>
                <Link href={`/el/${id}`}>Vedi articolo</Link>
            </div>
        </section>
    );
}
