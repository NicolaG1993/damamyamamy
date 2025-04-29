import { ClientsTableProps } from "@/types/client";
import styles from "./Table.module.css";
import Link from "next/link";

export default function ClientsTable({
    clients,
    isLoading,
}: ClientsTableProps) {
    return (
        <div className={styles.container}>
            {isLoading ? (
                <div className={styles.isLoading}>Caricamento...</div>
            ) : clients && !!clients.length ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Cognome</th>
                            <th>Email</th>
                            <th>Telefono</th>
                            <th>Codice</th>
                            <th>Data Creazione</th>
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map((client) => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td className={styles.nameColumn}>
                                    {client.firstName}
                                </td>
                                <td>{client.lastName}</td>
                                <td>{client.email}</td>
                                <td>{client.phone}</td>
                                <td>{client.code}</td>
                                {/* <td>{client.items}</td> */}
                                <td>
                                    {new Date(
                                        client.createdAt
                                    ).toLocaleDateString()}
                                </td>
                                <td className={styles.actionsColumn}>
                                    <div className={styles.actions}>
                                        <Link
                                            href={`/admin/clienti/${client.id}`}
                                        >
                                            👁️
                                        </Link>
                                        <Link
                                            href={`/admin/clienti/modifica/${client.id}`}
                                        >
                                            ✏️
                                        </Link>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div className={styles.noResults}>Nessun risultato</div>
            )}
        </div>
    );
}
