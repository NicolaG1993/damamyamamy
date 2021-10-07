export default function Review({ checkoutToken, styles }) {
    return (
        <>
            <h5>Il vostro ordine:</h5>
            <div>
                {checkoutToken.live.line_items.map((product) => (
                    <div key={product.name} className={styles["review-row"]}>
                        <div className={styles["review-product-infos"]}>
                            <p>{product.name}</p>
                            <p>Quantità: {product.quantity}</p>
                        </div>

                        <p className={styles["review-product-price"]}>
                            {product.line_total.formatted_with_symbol}
                        </p>
                    </div>
                ))}
            </div>
            <div>
                <p className={styles["review-final-price"]}>
                    Totale: {checkoutToken.live.subtotal.formatted_with_symbol}
                </p>
            </div>
        </>
    );
}
