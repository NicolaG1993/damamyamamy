import { Client } from "@/types/client";
import styles from "../Admin.module.css";

interface AdminClientProps {
    client: Client;
}

export default function AdminClient({ client }: AdminClientProps) {
    return (
        <div className={styles.elContainer}>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>ID</p>
                <p className={styles.elValue}>{client.id}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Nome</p>
                <p
                    className={styles.elValue}
                >{`${client.firstName} ${client.lastName}`}</p>
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
                <p className={styles.elLabel}>Codice</p>
                <p className={styles.elValue}>{client.code}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Articoli</p>
                {/* <p className={styles.elValue}>{client.items}</p> */}
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Data Creazione</p>
                <p className={styles.elValue}>
                    {new Date(client.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
