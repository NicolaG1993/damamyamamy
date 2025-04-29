"use client";

import createMarkup from "@/utils/createMarkup";
import Image from "next/image";
import Link from "next/link";
import styles from "./ShortList.module.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { ShopItemPreview } from "@/types/shop";
import { NO_IMAGE } from "@/constants/design";

interface ShortListProps {
    listTitle: string;
    // data: ShopItem[];
}

export default function ShortList({ listTitle }: ShortListProps) {
    // 🧠👇 TODO: dove dichiarare isLoading? non posso nel parent perché é home page - dovrei gestire BE data direttamente qua (ma tenere component flessibile)
    const [isLoading, setIsLoading] = useState(true); // Todo: finire 🧠
    const [data, setData] = useState<ShopItemPreview[]>([]); // Todo: finire 🧠
    // 🧠👇 TODO: posso prendere ShopItem and ShopSkeleton elements? this DOM is slightly different and rendundant at the same time

    const fetchData = async () => {
        //TODO
        setIsLoading(true);
        try {
            const { data } = await axios.get("/api/hello"); // TODO: Cambiare nome di "hello"
            // setLastItems(data.lastItems);
            // setLowerPriceItem(data.lowerPrice);
            setData(data);
        } catch (err) {
            setData([]);
            // setLastItems();
            // setLowerPriceItem();
            console.log("Error: ", err); // console.error("Error: ", err);
            alert(
                "Sembra che abbiamo dei problemi con il nostro sito, riprova piú tardi oppure contattaci al 347 9792 644, ci scusiamo per il disagio."
            ); // TODO: Move alert to /constants/messages.ts files
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div id={styles.ShortList}>
            <div className={styles.displayerHeading}>
                <p>{listTitle}</p>
            </div>

            {isLoading ? (
                <div className={styles.noDataWrap}>
                    <p>Caricamento</p>
                </div>
            ) : !!data?.length ? (
                <div className={styles.shortListGrid}>
                    {data.map((item, i) => (
                        <Link
                            href={`/negozio/articolo/${item.name}`}
                            key={`ShortList ${listTitle} ${item.name} ${i}`}
                            className={styles.gridElement}
                            title={item.name}
                        >
                            <div id={styles.thumbnailWrap}>
                                <div
                                    style={{
                                        position: "relative",
                                    }}
                                    className={styles.picWrap}
                                >
                                    <Image
                                        src={item.pic || NO_IMAGE}
                                        alt={item.name}
                                        fill
                                        style={{ objectFit: "cover" }}
                                    />
                                </div>

                                <div className={styles.gridElementInfos}>
                                    <h5
                                        dangerouslySetInnerHTML={createMarkup(
                                            item.name
                                        )}
                                    ></h5>
                                    <p>€{item.price}</p>
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
