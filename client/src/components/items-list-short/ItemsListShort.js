import React, { useState, useEffect } from "react";

import Product from "../shop/product/Product";

export default function ItemsListShort({
    products,
    notAvailables,
    onAddToCart,
    removeFromCart,
    listTitle,
}) {
    const [sliceStart, setSliceStart] = useState(0);

    const seeNext = () => {
        setSliceStart((startingPoint) =>
            startingPoint < products.length - 4
                ? startingPoint + 4
                : (startingPoint = 0)
        );
    };

    const seePrev = () => {
        setSliceStart((startingPoint) =>
            startingPoint < 4
                ? products.length - (products.length % 4)
                : startingPoint - 4
        );
    };

    useEffect(() => {
        document.querySelectorAll(".product-box").forEach((el) => {
            el.classList.add("fade-in");
        });
    });

    return (
        <div className="items-shortlist-container">
            <h3>{listTitle}</h3>
            <button className={"layout-button"} onClick={() => seePrev()}>
                Prev
            </button>
            <button className={"layout-button"} onClick={() => seeNext()}>
                Next
            </button>
            <div className={"products-small"}>
                {products &&
                    products
                        .slice(sliceStart, sliceStart + 4)
                        .map((product) => (
                            <div
                                className={"product-box product-box-shortlist"}
                                key={product.id}
                            >
                                <Product
                                    product={product}
                                    notAvailables={notAvailables}
                                    onAddToCart={onAddToCart}
                                    removeFromCart={removeFromCart}
                                    cardSize={"small"}
                                />
                            </div>
                        ))}
            </div>
        </div>
    );
}

// usare map su un array
// l'array arriva da un axios req -> server -> database
// si usa l'id dello user (se cé!) per ricevere un array personalizzata
// (si possono usare cookies? stile facebook o pubblicitá per risultati ancora piú personallizati - informarsi)
// se no andare per ordine cronologico - o simile
