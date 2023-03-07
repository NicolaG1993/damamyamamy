import Image from "next/image";
import Link from "next/link";
import styles from "./PicAndTextSection.module.css";

export default function PicAndTextSection({ item }) {
    // voglio che in home cerci il prodotto con il prezzo piu basso, negli ultimi 10-20 inseriti
    let { name, price, id, pics } = item;
    return (
        <section id={styles.PicAndTextSection}>
            <div>
                <div>
                    <Image
                        src={pics[0] || "/no-image.png"}
                        alt={name}
                        fill
                        style={{ objectFit: "cover" }}
                    />
                </div>
            </div>
            <div>
                <div className={styles.textWrap}>
                    <p className={styles.title}>Occasione</p>
                    <p>{name}</p>
                    <p>€ {price}</p>
                    <Link href={`/negozio/articolo/${item.id}`}>
                        Vedi l&apos;articolo
                    </Link>
                </div>
            </div>
        </section>
    );
}
