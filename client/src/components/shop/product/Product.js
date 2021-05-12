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
                    <div className={"product-img"}>
                        <img src={product.media.source || "test1.jpg"} />
                    </div>

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
                    <div className={"product-img"}>
                        <img src={product.media.source || "test1.jpg"} />
                    </div>
                    {/* <div className={"product-divider"}> </div> */}

                    <div className={"product-info"}>
                        <h4>{product.name}</h4>
                        <div className={"product-divider-small"}> </div>

                        <p className={"price-for-small-card"}>
                            <span className={"price-for-small-card-tag"}>
                                Prezzo:{" "}
                            </span>
                            {product.price.raw}€
                        </p>
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
