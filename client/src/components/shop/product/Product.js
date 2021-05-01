import React from "react";
import { Link } from "react-router-dom";
import AddToCartBtn from "./AddToCartBtn";

export default function Product({
    product,
    notAvailables,
    onAddToCart,
    removeFromCart,
    cardSize,
}) {
    // console.log("props in Product.js: ", product);

    if (cardSize === "medium")
        return (
            <div className={"product-content"}>
                <Link to={`/item/${product.id}`}>
                    <img src={product.media.source || "test1.jpg"} />

                    <div className={"product-info"}>
                        <h2>{product.name}</h2>
                        <span
                            className={"product-description"}
                            dangerouslySetInnerHTML={{
                                __html: product.description,
                            }}
                        ></span>
                        <h5>{product.price.raw}€</h5>
                    </div>
                </Link>
                {/* {notAvailables && notAvailables.filter} */}
                <AddToCartBtn
                    cardSize={cardSize}
                    product_id={product.id}
                    notAvailables={notAvailables}
                    onAddToCart={onAddToCart}
                    removeFromCart={removeFromCart}
                />
            </div>
        );

    if (cardSize === "small")
        return (
            <div className={"product-content"}>
                <Link to={`/item/${product.id}`}>
                    <img src={product.media.source || "test1.jpg"} />

                    <div className={"product-info"}>
                        <h4>{product.name}</h4>
                        <h4 className={"price-for-small-card"}>
                            {product.price.raw}€
                        </h4>
                    </div>
                </Link>
                <AddToCartBtn
                    cardSize={cardSize}
                    product_id={product.id}
                    notAvailables={notAvailables}
                    onAddToCart={onAddToCart}
                    removeFromCart={removeFromCart}
                />
            </div>
        );
}

//devo attivare la fn removeFromCart sul btn 🐔
