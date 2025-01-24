import { Item } from "@/types/item";
import styles from "../Admin.module.css";

interface AdminItemProps {
    item: Item;
}

export default function AdminItem({ item }: AdminItemProps) {
    return (
        <div className={styles.elContainer}>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>ID</p>
                <p className={styles.elValue}>{item.id}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Nome</p>
                <p className={styles.elValue}>{item.name}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Prezzo</p>
                <p className={styles.elValue}>{item.price}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>In magazzino</p>
                <p className={styles.elValue}>{item.stock}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Marca</p>
                <p className={styles.elValue}>{item.brand?.name || "N/A"}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Proprietario</p>
                <p
                    className={styles.elValue}
                >{`${item.owner.firstName} ${item.owner.lastName}`}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Condizioni</p>
                <p className={styles.elValue}>{item.condition}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Foto</p>
                {/* <p className={styles.elValue}>{item.pics}</p> */}
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Categorie</p>
                {/* <p className={styles.elValue}>{item.categories}</p> */}
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Slug</p>
                <p className={styles.elValue}>{item.slug}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Data Creazione</p>
                <p className={styles.elValue}>
                    {new Date(item.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
