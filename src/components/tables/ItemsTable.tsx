import { ItemsTableProps } from "@/types/item";
import styles from "./Table.module.css";

export default function ItemsTable({ items }: ItemsTableProps) {
    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Prezzo</th>
                        <th>Numero</th>
                        <th>Marca</th>
                        <th>Foto</th>
                        <th>Proprietario</th>
                        <th>Data Creazione</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.stock}</td>
                            <td>{item.brand?.name || "N/A"}</td>
                            <td>{item.pic}</td>
                            <td>{`${item.owner.firstName} ${item.owner.lastName}`}</td>
                            <td>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
