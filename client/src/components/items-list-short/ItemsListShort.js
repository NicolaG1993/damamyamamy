import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Product from "../shop/product/Product";

export default function ItemsListShort({
    products,
    onAddToCart,
    removeFromCart,
}) {
    const [sliceStart, setSliceStart] = useState(0);
    const [sliceEnd, setSliceEnd] = useState(5);

    const seeNext = () => {
        setSliceStart((startingPoint) =>
            startingPoint < products.length
                ? startingPoint + 5
                : (startingPoint = 0)
        );
    };
    const seePrev = () => {
        setSliceStart((startingPoint) => startingPoint + 5);
        setSliceEnd((endingPoint) => endingPoint + 5);
    };

    return (
        <div className="items-shortlist-container">
            <div className={"products-small"}>
                {products &&
                    products.slice(sliceStart, sliceEnd).map((product) => (
                        <div className={"product-box"} key={product.id}>
                            <Link>
                                <Product
                                    product={product}
                                    onAddToCart={onAddToCart}
                                    RemoveFromCart={removeFromCart}
                                    cardSize={"small"}
                                />
                            </Link>
                        </div>
                    ))}
            </div>
            <button onClick={seePrev}>Prev</button>
            <button onClick={seeNext}>Next</button>
        </div>
    );
}

// usare map su un array
// l'array arriva da un axios req -> server -> database
// si usa l'id dello user (se cé!) per ricevere un array personalizzata
// (si possono usare cookies? stile facebook o pubblicitá per risultati ancora piú personallizati - informarsi)
// se no andare per ordine cronologico - o simile
