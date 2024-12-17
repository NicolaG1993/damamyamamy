import styles from "./ShopItems.module.css";
import { PAGINATION } from "@/constants/config";

export default function ShopItemsSkeleton() {
    return (
        <div className={styles.shopGrid}>
            {Array.from({ length: PAGINATION.defaultPageSize }).map(
                (_, index) => (
                    <div
                        key={"skeleton div " + index}
                        className={styles.skeletonCard}
                    >
                        <div></div>
                        <div className={styles.gridElementInfos}>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                )
            )}
        </div>
    );
}
