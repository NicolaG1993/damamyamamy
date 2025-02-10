import styles from "./ShopItems.module.css";
import ShopItemPreview from "./ShopItemPreview";
import { ShopItemPreview as ShopItemPreviewType } from "@/types/shop";

interface ShopItemsProps {
    items: ShopItemPreviewType[];
}

export default function ShopItems({ items }: ShopItemsProps) {
    return (
        <div className={styles.shopGrid}>
            {items.map((item) => (
                <ShopItemPreview item={item} key={"Shop item " + item.slug} />
            ))}
        </div>
    );
}
