import styles from "./ShopItems.module.css";
import ShopItem from "./ShopItem";

export default function ShopItems({ items }) {
    console.log("items: ", items);
    return (
        <div className={styles.shopGrid}>
            {items.map((item) => (
                <ShopItem item={item} key={"Shop item " + item.slug} />
            ))}
        </div>
    );
}
