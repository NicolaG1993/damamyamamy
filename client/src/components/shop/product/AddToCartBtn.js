import React, { useState, useEffect } from "react";

export default function AddToCartBtn({
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
                className={"add-cart"}
                onClick={() => onAddToCart(product_id, 1)}
            ></button>
        ) : (
            <button
                className={"remove-cart"}
                onClick={() => removeFromCart(itemId)}
            >
                X
            </button>
        );

    return <Button />;
}
