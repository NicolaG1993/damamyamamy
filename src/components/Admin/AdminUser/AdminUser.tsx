import { User } from "@/types/user";
import styles from "../Admin.module.css";

interface AdminUserProps {
    user: User;
}

export default function AdminUser({ user }: AdminUserProps) {
    return (
        <div className={styles.elContainer}>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>ID</p>
                <p className={styles.elValue}>{user.id}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Nome</p>
                <p
                    className={styles.elValue}
                >{`${user.firstName} ${user.lastName}`}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Email</p>
                <p className={styles.elValue}>{user.email}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Admin</p>
                <p className={styles.elValue}>{user.isAdmin ? "Sí" : "No"}</p>
            </div>
            <div className={styles.elRow}>
                <p className={styles.elLabel}>Data Creazione</p>
                <p className={styles.elValue}>
                    {new Date(user.createdAt).toLocaleDateString()}
                </p>
            </div>
        </div>
    );
}
