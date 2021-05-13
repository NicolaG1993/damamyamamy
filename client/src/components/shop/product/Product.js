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

    function createMarkup() {
        return { __html: product.description };
    }

    if (cardSize === "medium")
        return (
            <div className={"product-content"}>
                <Link
                    to={`/item/${product.id}`}
                    className={"product-content-medium"}
                >
                    <div className={"product-img"}>
                        <img src={product.media.source || "test1.jpg"} />
                    </div>

                    <div className={"product-info"}>
                        <h3>{product.name}</h3>

                        <div className={"product-divider-small"}> </div>
                        <div
                            className={"product-description"}
                            dangerouslySetInnerHTML={createMarkup()}
                        ></div>

                        <h5>
                            <span className={"price-for-small-card-tag"}>
                                Prezzo:{" "}
                            </span>
                            {product.price.raw}€
                        </h5>
                        <br />
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
                <Link
                    to={`/item/${product.id}`}
                    className={"product-content-small"}
                >
                    <div className={"product-img"}>
                        <img src={product.media.source || "test1.jpg"} />
                    </div>
                    {/* <div className={"product-divider"}> </div> */}

                    <div className={"product-info"}>
                        <h4>{product.name}</h4>
                        <div className={"product-divider-small"}> </div>

                        <h5>
                            <span className={"price-for-small-card-tag"}>
                                Prezzo:{" "}
                            </span>
                            {product.price.raw}€
                        </h5>
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
