import { ShopItem } from "@/types/shop";
import Image from "next/image";
import styles from "./ShopItem.module.css";
import { useState } from "react";

interface ShopItemProps {
    item: ShopItem;
}

export default function ShopItem({ item }: ShopItemProps) {
    const [selectedPic, setSelectedPic] = useState(0);

    const handlePicDisplay = (i: number) => {
        setSelectedPic(i);
    };

    return (
        <div className={styles.elContainer}>
            <div className={styles.elBlock}>
                <div className={styles.elBlockColumn}>
                    <div className={styles.picDisplayer}>
                        <Image
                            src={item.pics[selectedPic]}
                            alt={`item pic: ${item.pics[selectedPic]} ${item.name}`}
                            fill
                            style={{
                                objectFit: "contain",
                            }}
                        />
                    </div>

                    <div className={styles.elPicturesList}>
                        {item.pics?.map((pic: string, i: number) => (
                            <div
                                key={`item pic: ${pic} ${i}`}
                                className={`${styles.elPicture} ${
                                    i === selectedPic
                                        ? styles.selectedPic
                                        : styles.unselectedPic
                                }`}
                                onClick={() => handlePicDisplay(i)}
                            >
                                <Image
                                    src={pic}
                                    alt={`item pic: ${pic} ${i}`}
                                    fill
                                    style={{
                                        objectFit: "cover",
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                <div />

                <div className={styles.elBlockColumn}>
                    <div className={styles.elMainInfo}>
                        <div>
                            <h1 className={styles.name}>{item.name}</h1>
                            <h2 className={styles.brand}>{item.brand}</h2>
                        </div>
                        <h3 className={styles.price}>
                            {item.price.toFixed(2)} €
                        </h3>
                    </div>
                </div>
            </div>

            <div className={styles.elSeparator} />

            {item.description && (
                <>
                    <div className={styles.elBlock}>
                        <div className={styles.elBlockColumn}>
                            <div className={styles.elRow}>
                                <p className={styles.elLabel}>Descrizione</p>
                                <p className={styles.elValue}>
                                    {item.description || "-"}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className={styles.elSeparator} />
                </>
            )}

            <div className={styles.elBlock}>
                <div className={styles.elBlockColumn}>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Condizioni</p>
                        <p className={styles.elValue}>{item.condition}</p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>In magazzino</p>
                        <p className={styles.elValue}>{item.stock}</p>
                    </div>
                </div>

                <div />

                <div className={styles.elBlockColumn}>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Categorie</p>
                        <div className={styles.elList}>
                            {item.categories?.map((category, i) => (
                                <span
                                    key={`item category: ${category} ${i}`}
                                    className={styles.category}
                                >
                                    {category}
                                </span>
                            )) || "Nessuna"}
                        </div>
                    </div>
                    {/* <div className={styles.elRow}>
                        <p className={styles.elLabel}>Data Creazione</p>
                        <p className={styles.elValue}>{item.createdAt}</p>
                    </div> */}
                    {/* <div className={styles.elRow}>
                        <p className={styles.elLabel}>Venduto</p>
                        <p className={styles.elValue}>
                            {item.soldAt ? "Sì" : "No"}
                        </p>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
