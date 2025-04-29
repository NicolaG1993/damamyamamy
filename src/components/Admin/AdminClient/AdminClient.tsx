import { Client } from "@/types/client";
import styles from "../Admin.module.css";
import Link from "next/link";
import Image from "next/image";
import { NO_IMAGE } from "@/constants/design";

interface AdminClientProps {
    client: Client;
}

export default function AdminClient({ client }: AdminClientProps) {
    return (
        <div className={styles.elContainer}>
            <div className={styles.elBlock}>
                <div className={styles.elBlockColumn}>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Nome</p>
                        <p className={styles.elValue}>{client.firstName}</p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Cognome</p>
                        <p className={styles.elValue}>{client.lastName}</p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Codice cliente</p>
                        <p className={styles.elValue}>{client.code}</p>
                    </div>
                </div>

                <div className={styles.elBlockColumn}>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>#ID</p>
                        <p className={styles.elValue}>{client.id}</p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Email</p>
                        <p className={styles.elValue}>{client.email}</p>
                    </div>
                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Telefono</p>
                        <p className={styles.elValue}>{client.phone}</p>
                    </div>

                    <div className={styles.elRow}>
                        <p className={styles.elLabel}>Data Creazione</p>
                        <p className={styles.elValue}>
                            {new Date(client.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className={styles.elSeparator}></div>

            <div className={`${styles.elBlock} ${styles.elBlockFull}`}>
                <div className={`${styles.elRow} ${styles.cleanRow}`}>
                    <p className={styles.elLabel}>Articoli</p>
                </div>
                <div className={styles.elItemsList}>
                    {!!client.items?.length ? (
                        client.items.map((item, i) => (
                            <Link
                                key={`client item: ${item.id} ${i}`}
                                href={`/admin/articoli/${item.id}`}
                                className={styles.elItem}
                            >
                                <div className={styles.elItemPic}>
                                    <Image
                                        src={item.pic || NO_IMAGE}
                                        alt={`item pic: ${item.pic} ${i}`}
                                        fill
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>

                                <div className={styles.elItemInfo}>
                                    <div className={styles.elItemHeading}>
                                        <p>{item.name}asdsadasfggsadsad</p>
                                    </div>
                                    <div className={styles.elItemSubHeading}>
                                        <p className={styles.elItemPrice}>
                                            €{item.price}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>Nessun articolo</p>
                    )}
                </div>
            </div>
        </div>
    );
}
