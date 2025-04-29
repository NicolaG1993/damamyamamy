import { ItemsTableProps, ItemsTableRow } from "@/types/item";
import styles from "./Table.module.css";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BREAKPOINTS, NO_IMAGE } from "@/constants/design";
import InputCheckbox from "../inputs/InputCheckbox";

export default function ItemsTable({
    items,
    isLoading,
    soldItemsView,
    handleView,
    handleSellItem,
    handleUnsellItem,
}: ItemsTableProps) {
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
            <div className={styles.tableFilters}>
                {/* <div className={styles.filtersHeading}>Filtri:</div> */}
                <div className={styles.filterWrap}>
                    <InputCheckbox
                        name="isAdmin"
                        isChecked={!soldItemsView}
                        onChange={handleView}
                        label="In vendita"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className={styles.isLoading}>Caricamento...</div>
            ) : items && !!items.length ? (
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {isLargeScreen && <th>ID</th>}
                            <th>Foto</th>
                            <th>Nome</th>
                            <th>Prezzo</th>
                            {isLargeScreen && <th>Marca</th>}
                            {isLargeScreen && <th>Numero</th>}
                            {isLargeScreen && <th>Proprietario</th>}
                            {isLargeScreen && <th>Categorie</th>}
                            {isLargeScreen && <th>Data Creazione</th>}
                            <th>Azioni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item: ItemsTableRow, i: number) => (
                            <tr key={item.id}>
                                {isLargeScreen && <td>{item.id}</td>}
                                <td className={styles.previewPicColumn}>
                                    <div className={styles.previewPic}>
                                        <Image
                                            src={item.pic || NO_IMAGE}
                                            alt={`Preview row pic ${i + 1}`}
                                            fill
                                            style={{
                                                objectFit: "cover",
                                            }}
                                        />
                                    </div>
                                </td>
                                <td className={styles.nameColumn}>
                                    {item.name}
                                </td>
                                <td>€{item.price}</td>
                                {isLargeScreen && (
                                    <td>{item.brand?.name || "-"}</td>
                                )}
                                {isLargeScreen && <td>{item.stock}</td>}
                                {isLargeScreen && <td>{item.owner.name}</td>}
                                {isLargeScreen && (
                                    <td>{item.totalCategories}</td>
                                )}
                                {isLargeScreen && (
                                    <td>
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleDateString()}
                                    </td>
                                )}
                                <td className={styles.actionsColumn}>
                                    <div className={styles.actions}>
                                        {!soldItemsView ? (
                                            <span
                                                onClick={() =>
                                                    handleSellItem(item.id)
                                                }
                                            >
                                                🛍️
                                            </span>
                                        ) : (
                                            <span
                                                onClick={() =>
                                                    handleUnsellItem(item.id)
                                                }
                                            >
                                                🏬
                                            </span>
                                        )}
                                        <Link
                                            href={`/admin/articoli/${item.id}`}
                                        >
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
            ) : (
                <div className={styles.noResults}>Nessun risultato</div>
            )}
        </div>
    );
}
