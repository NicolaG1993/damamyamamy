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
                    className="layout-button btn2"
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
                >
                    <svg
                        id="Livello_1"
                        data-name="Livello 1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 128 122.04"
                    >
                        <path
                            d="M862,447v-5c3.51-3.75,8.11-3,12.51-3,13,0,16.86,3.1,18.29,15.71.46,4.11,1.94,5.14,5.88,5.12,27.47-.16,54.94,0,82.41-.13,3.48,0,6.57.49,8.91,3.29v5c-3.78,14-5.87,28.27-8.89,42.38-2.3,10.77-7.68,15.46-18.61,15.48-17.64,0-35.28,0-52.91,0-13.69,0-18.73-4.64-20.61-18.26-2.39-17.29-5.28-34.51-7.46-51.82-.6-4.81-2.67-5.57-6.74-5.44C870.28,450.49,865.33,451.6,862,447Z"
                            transform="translate(-862 -438.95)"
                        />
                        <path
                            d="M973.94,546.16a14.94,14.94,0,1,1-14.89-15.07A15.39,15.39,0,0,1,973.94,546.16Z"
                            transform="translate(-862 -438.95)"
                        />
                        <path
                            d="M922.24,546.08c0,8-6.67,14.79-14.46,14.79s-14.51-6.76-14.64-14.69S900.24,531,908,531.12A14.8,14.8,0,0,1,922.24,546.08Z"
                            transform="translate(-862 -438.95)"
                        />
                    </svg>
                </button>
            )
        ) : cardSize === "shop-item" ? (
            <button
                className="layout-button btn-dark2"
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
                <svg
                    id="Livello_1"
                    data-name="Livello 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 128 128"
                >
                    <path
                        d="M1003,533v7a48.72,48.72,0,0,1-13,13h-7c-2.73-2.37-5.61-4.59-8.18-7.12-11-10.9-22-21.83-32.85-32.91-2.31-2.36-3.7-2.41-5.93,0-3.81,4.18-7.88,8.14-12,12-9.73,9.27-18.4,19.65-29.06,28h-7a49.91,49.91,0,0,1-13-13v-7c2.24-2.6,4.33-5.35,6.74-7.79q16.65-16.82,33.48-33.44c2.18-2.14,2.26-3.45,0-5.54-4-3.7-7.87-7.62-11.65-11.59C894.1,464.71,883.52,455.85,875,445v-7a49.61,49.61,0,0,1,13-13h7c2.61,2.23,5.37,4.31,7.81,6.72q16.82,16.63,33.43,33.47c2.13,2.18,3.46,2.31,5.54,0,3.23-3.57,6.7-6.92,10.18-10.24,10.4-9.94,19.73-21,31-30h7a48.87,48.87,0,0,1,13,13v7a71.13,71.13,0,0,1-7.41,8.59C984.7,464.38,974,475.32,963,486c-2.36,2.3-2.45,3.69,0,5.92,4.18,3.81,8.14,7.88,12,12C984.32,513.67,994.7,522.34,1003,533Z"
                        transform="translate(-875 -425)"
                    />
                </svg>
            </button>
        );

    return <Button />;
}
