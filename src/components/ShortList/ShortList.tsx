"use client";

import createMarkup from "@/utils/createMarkup";
import Image from "next/image";
import Link from "next/link";
import styles from "./ShortList.module.css";
import { useState } from "react";

export default function ShortList({ tableName }) {
    // 🧠👇 TODO: dove dichiarare isLoading? non posso nel parent perché é home page - dovrei gestire BE data direttamente qua (ma tenere component flessibile)
    const [isLoading, setIsLoading] = useState(true); // Todo: finire 🧠
    const [data, setData] = useState([]); // Todo: finire 🧠
    // 🧠👇 TODO: posso prendere ShopItem and ShopSkeleton elements? this DOM is slightly different and rendundant at the same time

    const fetchData = async () => {
        //TODO
        // setData(res)
        // setIsLoading(false);
        try {
            const { data } = await axios.get("/api/hello"); // TODO: Cambiare nome di "hello"
            setLastItems(data.lastItems);
            setLowerPriceItem(data.lowerPrice);
        } catch (err) {
            setLastItems();
            setLowerPriceItem();
            alert(
                "Sembra che abbiamo dei problemi con il nostro sito, riprova piú tardi oppure contattaci al 347 9792 644, ci scusiamo per il disagio."
            ); // TODO: Move alert to /constants/messages.ts files
        }
    };

    return (
        <div id={styles.ShortList}>
            <div className={styles.displayerHeading}>
                <p>{tableName}</p>
            </div>

            {isLoading ? (
                <div className={styles.noDataWrap}>
                    <p>Caricamento</p>
                </div>
            ) : !!data?.length ? (
                <div className={styles.shortListGrid}>
                    {data.map((el) => (
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
                    ))}
                </div>
            ) : (
                <div className={styles.noDataWrap}>
                    <p>Nessun risultato disponibile</p>
                </div>
            )}
        </div>
    );
}
