import Image from "next/image";
import Link from "next/link";
import styles from "./PicAndTextSection.module.css";

export default function PicAndTextSection({ item }) {
    // voglio che in home cerci il prodotto con il prezzo piu basso, negli ultimi 10-20 inseriti
    let { title, price, id } = item;
    return (
        <section id={styles.PicAndTextSection}>
            <div>
                <Image />
            </div>
            <div>
                <div className={styles.textWrap}>
                    <p className={styles.title}>Occasione</p>
                    <p>{title}</p>
                    <p>€{price}</p>
                    <Link href={`/el/${id}`}>Vedi l&apos;articolo</Link>
                </div>
            </div>
        </section>
    );
}
