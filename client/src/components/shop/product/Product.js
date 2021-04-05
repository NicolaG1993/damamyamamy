import React from "react";

export default function Product({ product }) {
    console.log("props in Product.js: ", product);

    // return <div>Test</div>;

    return (
        <div className={"product-content"}>
            <img src={product.media.source || "test1.jpg"} />
            <div className={"product-info"}>
                <h2>{product.name}</h2>
                <p
                    dangerouslySetInnerHTML={{ __html: product.description }}
                ></p>
                <p>{product.price.raw}€</p>
            </div>
            <button>Nel carrello</button>
        </div>
    );
}
