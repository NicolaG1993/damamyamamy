import React, { useState, useEffect } from "react";

export default function AddToCartBtn({
    cardSize,
    product_id,
    notAvailables,
    onAddToCart,
    removeFromCart,
}) {
    const [isAvailable, setIsAvailable] = useState(false);
    const [itemId, setItemId] = useState("");
    // console.log("product_id: ", product_id);
    // console.log("notAvailables: ", notAvailables);

    useEffect(() => {
        // notAvailables.filter((item) => item.includes(product.id));

        let results = notAvailables.filter((i) => {
            return i.product_id === product_id;
        });
        // console.log("results: ", results);

        if (results.length === 0) {
            setIsAvailable(true);
            // console.log("isAvailable: ", isAvailable);
        } else {
            setItemId(results[0].item_id);
            setIsAvailable(false);
            // console.log("results.item_id: ", results[0].item_id);
            // console.log("isAvailable: ", isAvailable);
        }

        // if (notAvailables.hasOwnProperty(product_id))
    }, [notAvailables]);

    let Button = () =>
        isAvailable ? (
            cardSize === "shop-item" ? (
                <button
                    className="layout-button"
                    onClick={() => onAddToCart(product_id, 1)}
                >
                    Aggiungi al carrello
                </button>
            ) : (
                <button
                    className={`add-cart ${
                        cardSize === "small"
                            ? "add-cart-for-small"
                            : "add-cart-for-medium"
                    }`}
                    onClick={() => onAddToCart(product_id, 1)}
                ></button>
            )
        ) : cardSize === "shop-item" ? (
            <button
                className="layout-button-dark"
                onClick={() => removeFromCart(itemId)}
            >
                Rimuovi dal carrello
            </button>
        ) : (
            <button
                className={`remove-cart ${
                    cardSize === "small"
                        ? "remove-cart-for-small"
                        : "remove-cart-for-medium"
                }`}
                onClick={() => removeFromCart(itemId)}
            >
                X
            </button>
        );

    return <Button />;
}
