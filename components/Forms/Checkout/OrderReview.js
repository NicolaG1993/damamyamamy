import styles from "../Form.module.css";

export default function OrderReview({
    cartItems,
    totalPrice,
    itemsPrice,
    taxPrice,
    shippingPrice,
}) {
    return (
        <div id={styles.OrderReview}>
            <h5>Il vostro ordine:</h5>
            <div>
                {cartItems &&
                    cartItems.map((product) => (
                        <div
                            key={product.name}
                            className={styles["review-row"]}
                        >
                            <p>{product.quantity} x</p>
                            <p>{product.name}</p>
                            <p className={styles["review-product-price"]}>
                                {product.price} €
                            </p>
                        </div>
                    ))}
            </div>

            <div className={styles["price-row"]}>
                <p>Articoli: {itemsPrice} €</p>
                <p>Spese di spedizione: {shippingPrice} €</p>
                <p>Tasse: {taxPrice} €</p>
                <h4 className={styles["review-final-price"]}>
                    Totale: {totalPrice} €
                </h4>
            </div>
        </div>
    );
}
