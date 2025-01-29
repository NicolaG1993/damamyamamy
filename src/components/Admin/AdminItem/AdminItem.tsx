import { Item } from "@/types/item";
import styles from "../Admin.module.css";
import Link from "next/link";
import Image from "next/image";

interface AdminItemProps {
    item: Item;
}

export default function AdminItem({ item }: AdminItemProps) {
    console.log("item: ", item);
    return (
        <div className={styles.elContainer}>
            <div className={styles.elBlock}>
                <div className={styles.elBlockColumn}>
                    <div className={`${styles.elRow} ${styles.cleanRow}`}>
                        <p className={styles.elLabel}>Foto</p>
                    </div>
                    <div className={styles.elPicturesList}>
                        {item.pics?.map((pic: string, i: number) => (
                            <div
                                key={`item pic: ${pic} ${i}`}
                                className={styles.elPicture}
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
                <div className={styles.elBlockColumn}>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>#ID</p>
                        <p className={styles.elValue}>{item.id}</p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Nome</p>
                        <p className={styles.elValue}>{item.name}</p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Prezzo</p>
                        <p className={styles.elValue}>€ {item.price}</p>
                    </div>
                </div>
            </div>

            <div className={styles.elSeparator}></div>

            <div className={styles.elBlock}>
                <div className={styles.elBlockColumn}>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Descrizione</p>
                        <p className={styles.elValue}>
                            {item.description || "-"}
                        </p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>In magazzino</p>
                        <p className={styles.elValue}>{item.stock}</p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Marca</p>
                        <p className={styles.elValue}>
                            {item.brand?.name || "-"}
                        </p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Proprietario</p>
                        <Link
                            href={`/admin/clienti/${item.owner.id}`}
                            className={styles.elLink}
                        >
                            <p>{item.owner.name}</p>
                        </Link>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Condizioni</p>
                        <p className={styles.elValue}>{item.condition}</p>
                    </div>
                </div>
                <div className={styles.elBlockColumn}>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Categorie</p>
                        <div className={styles.elList}>
                            {item.categories?.map((category, i) => (
                                <p
                                    key={`item category: ${category.id} ${i}`}
                                    className={styles.elValue}
                                >
                                    • {category.name}
                                </p>
                            )) || "-"}
                        </div>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Slug</p>
                        <p className={styles.elValue}>/{item.slug}</p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Data Creazione</p>
                        <p className={styles.elValue}>{item.createdAt}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
