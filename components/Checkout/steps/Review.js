export default function Review({
    cartItems,
    totalPrice,
    itemsPrice,
    taxPrice,
    shippingPrice,
    styles,
}) {
    return (
        <>
            <h5>Il vostro ordine:</h5>
            <div>
                {cartItems.map((product) => (
                    <div key={product.name} className={styles["review-row"]}>
                        <div className={styles["review-product-infos"]}>
                            <p>{product.name}</p>
                            <p>Quantità: {product.quantity}</p>
                        </div>

                        <p className={styles["review-product-price"]}>
                            {product.price} €
                        </p>
                    </div>
                ))}
            </div>

            <div className={"flex-paragraph"}>
                <p>Items Price:</p> <p>{itemsPrice} €</p>
            </div>
            <div className={"flex-paragraph"}>
                <p>Tax Price:</p> <p>{taxPrice} €</p>
            </div>
            <div className={"flex-paragraph"}>
                <p>Shipping Price:</p> <p>{shippingPrice} €</p>
            </div>
            <div>
                <h4 className={styles["review-final-price"]}>
                    Totale: {totalPrice} €
                </h4>
            </div>
        </>
    );
}
