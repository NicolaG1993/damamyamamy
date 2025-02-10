import styles from "./ShopItems.module.css";
import ShopItemPreview from "./ShopItemPreview";
import { ShopItem } from "@/types/shop";

interface ShopItemsProps {
    items: ShopItem[];
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
