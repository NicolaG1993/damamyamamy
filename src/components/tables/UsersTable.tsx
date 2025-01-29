import { UsersTableProps } from "@/types/user";
import styles from "./Table.module.css";
import Link from "next/link";

export default function UsersTable({ users }: UsersTableProps) {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Cognome</th>
                        <th>Email</th>
                        <th>Admin</th>
                        <th>Data Creazione</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? "Sì" : "No"}</td>
                            <td>
                                {new Date(user.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                <div className={styles.actions}>
                                    <Link href={`/admin/utenti/${user.id}`}>
                                        👁️
                                    </Link>
                                    <Link
                                        href={`/admin/utenti/modifica/${user.id}`}
                                    >
                                        ✏️
                                    </Link>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
