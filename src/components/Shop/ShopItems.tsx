import styles from "./ShopItems.module.css";
import ShopItem from "./ShopItem";

export default function ShopItems({ data, mockedData }) {
    return (
        <div className={styles.shopGrid}>
            {mockedData.map((el) => (
                <ShopItem item={el} key={"Shop item " + el.id} />
            ))}
        </div>
    );
}
