import React from "react";

export default function Product({
    product,
    onAddToCart,
    removeFromCart,
    cardSize,
}) {
    console.log("props in Product.js: ", product);

    if (cardSize === "medium")
        return (
            <div className={"product-content"}>
                <img src={product.media.source || "test1.jpg"} />

                <div className={"product-info"}>
                    <h2>{product.name}</h2>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    ></p>
                    <p>{product.price.raw}€</p>
                </div>
                <button
                    className={"add-cart"}
                    onClick={() => onAddToCart(product.id, 1)}
                >
                    <img
                        src={
                            "https://www.flaticon.com/svg/vstatic/svg/34/34568.svg?token=exp=1617620984~hmac=36cbab7489a1eb0abbfd28b9ea32ca3b"
                        }
                    />
                </button>
            </div>
        );

    if (cardSize === "small")
        return (
            <div className={"product-content"}>
                <img src={product.media.source || "test1.jpg"} />

                <div className={"product-info"}>
                    <h4>{product.name}</h4>
                    <p
                        dangerouslySetInnerHTML={{
                            __html: product.description,
                        }}
                    ></p>
                    <p>{product.price.raw}€</p>
                </div>
                <button
                    className={"add-cart"}
                    onClick={() => onAddToCart(product.id, 1)}
                >
                    <img
                        src={
                            "https://www.flaticon.com/svg/vstatic/svg/34/34568.svg?token=exp=1617620984~hmac=36cbab7489a1eb0abbfd28b9ea32ca3b"
                        }
                    />
                </button>
            </div>
        );
}

//devo attivare la fn removeFromCart sul btn 🐔
