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
            <button
                className={`add-cart ${
                    cardSize === "small"
                        ? "add-cart-for-small"
                        : cardSize === "medium"
                        ? "add-cart-for-medium"
                        : "add-cart-for-item"
                }`}
                onClick={() => onAddToCart(product_id, 1)}
            ></button>
        ) : (
            <button
                className={`remove-cart ${
                    cardSize === "small"
                        ? "remove-cart-for-small"
                        : cardSize === "medium"
                        ? "remove-cart-for-medium"
                        : "remove-cart-for-item"
                }`}
                onClick={() => removeFromCart(itemId)}
            >
                X
            </button>
        );

    return <Button />;
}
