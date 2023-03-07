import createMarkup from "@/utils/createMarkup";
import Image from "next/image";
import Link from "next/link";
import styles from "./Shortlist.module.css";

export default function ShortList({ data, tableName }) {
    return (
        <section className={styles.displayerWrap} id={styles.ShortList}>
            <div className={styles.displayerHeading}>
                <p>{tableName}</p>
                {/* <Link href={`/negozio`}>Tutti i prodotti</Link> */}
            </div>

            <div className={styles.shortListGrid}>
                {data ? (
                    data.length ? (
                        data.map((el) => (
                            <Link
                                href={`/negozio/articolo/${el.id}`}
                                key={tableName + " ShortList " + el.id}
                                className={styles.gridElement}
                                title={el.name}
                            >
                                <div id={styles.thumbnailWrap}>
                                    <div
                                        style={{
                                            position: "relative",
                                        }}
                                        className={styles.picWrap}
                                    >
                                        <Image
                                            src={
                                                el.pics && el.pics.length
                                                    ? el.pics[0]
                                                    : "/no-image.png"
                                            }
                                            alt={el.name}
                                            fill
                                            style={{ objectFit: "cover" }}
                                        />
                                    </div>

                                    <div className={styles.gridElementInfos}>
                                        <h5
                                            dangerouslySetInnerHTML={createMarkup(
                                                el.name
                                            )}
                                        ></h5>
                                        <p>€{el.price}</p>
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
