import { ClientsTableProps } from "@/types/client";
import styles from "./Table.module.css";

export default function ClientsTable({ clients }: ClientsTableProps) {
    return (
        <div className={styles.container}>
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
                    </tr>
                </thead>
                <tbody>
                    {clients.map((client) => (
                        <tr key={client.id}>
                            <td>{client.id}</td>
                            <td>{client.firstName}</td>
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
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
