import Image from "next/image";
import Link from "next/link";
import styles from "./Shortlist.module.css";

export default function ShortList({ data, tableName }) {
    return (
        <section className={styles.displayerWrap} id={styles.ShortList}>
            <div className={styles.displayerHeading}>
                <h4>{tableName}</h4>
                {/* <Link href={`/negozio`}>Tutti i prodotti</Link> */}
            </div>

            <div className={styles.shortListGrid} id={styles.ShortListGrid}>
                {data ? (
                    data.length ? (
                        data.map((el) => (
                            <Link
                                href={`/el/${el.id}`}
                                key={tableName + " ShortList " + el.id}
                                className={styles.gridElement}
                            >
                                <div id={styles[thumbnailSize]}>
                                    <div
                                        style={{
                                            position: "relative",
                                        }}
                                        className={styles.picWrap}
                                    >
                                        <Image
                                            src={
                                                el.pic
                                                    ? el.pic
                                                    : "/no-image.png"
                                            }
                                            alt={el[nameType]}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className={styles.gridElementInfos}>
                                        <h5>{el.title}</h5>
                                        <p>{el.price}</p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Nessun risultato disponibile</p>
                    )
                ) : (
                    <p>Caricamento...</p>
                )}
            </div>
        </section>
    );
}
