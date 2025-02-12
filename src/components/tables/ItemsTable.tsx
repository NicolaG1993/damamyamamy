import { ItemsTableProps, ItemsTableRow } from "@/types/item";
import styles from "./Table.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BREAKPOINTS } from "@/constants/design";

export default function ItemsTable({ items }: ItemsTableProps) {
    const [isLargeScreen, setIsLargeScreen] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth >= BREAKPOINTS.tablet);
        };

        handleResize(); // Check on mount
        window.addEventListener("resize", handleResize);

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <div className={styles.container}>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Foto</th>
                        <th>Nome</th>
                        <th>Prezzo</th>
                        {isLargeScreen && <th>Marca</th>}
                        {isLargeScreen && <th>Numero</th>}
                        <th>Proprietario</th>
                        {isLargeScreen && <th>Categorie</th>}
                        <th>Data Creazione</th>
                        <th>Azioni</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item: ItemsTableRow, i: number) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>
                                <div className={styles.previewPic}>
                                    <Image
                                        src={item.pic}
                                        alt={`Preview row pic ${i + 1}`}
                                        fill
                                        style={{
                                            objectFit: "cover",
                                        }}
                                    />
                                </div>
                            </td>
                            <td>{item.name}</td>
                            <td>{item.price} €</td>
                            {isLargeScreen && (
                                <td>{item.brand?.name || "-"}</td>
                            )}
                            {isLargeScreen && <td>{item.stock}</td>}
                            <td>{item.owner.name}</td>
                            {isLargeScreen && <td>{item.totalCategories}</td>}
                            <td>
                                {new Date(item.createdAt).toLocaleDateString()}
                            </td>
                            <td>
                                <div className={styles.actions}>
                                    <Link href={`/admin/articoli/${item.id}`}>
                                        👁️
                                    </Link>
                                    <Link
                                        href={`/admin/articoli/modifica/${item.id}`}
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
