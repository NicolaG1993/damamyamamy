import styles from "./ShopItems.module.css";
import ShopItemPreview from "./ShopItemPreview";

export default function ShopItems({ items }) {
    return (
        <div className={styles.shopGrid}>
            {items.map((item) => (
                <ShopItemPreview item={item} key={"Shop item " + item.slug} />
            ))}
        </div>
    );
}
