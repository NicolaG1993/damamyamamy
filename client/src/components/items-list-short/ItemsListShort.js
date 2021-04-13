import React from "react";
import Product from "../shop/product/Product";
import { Link } from "react-router-dom";

export default function ItemsListShort({
    products,
    onAddToCart,
    removeFromCart,
}) {
    console.log("Products: ", products);
    //devo mettere un limite a map
    //magari fare un carousel? o solo due freccie che caricano nuovi index?
    //va bene che passo Products component o meglio crearne uno nuovo, specifico per qui?
    return (
        <div className="items-shortlist-container">
            <div className={"products"}>
                {products &&
                    products.map((product) => (
                        <div className={"product-box"} key={product.id}>
                            <Link>
                                <Product
                                    product={product}
                                    onAddToCart={onAddToCart}
                                    RemoveFromCart={removeFromCart}
                                />
                            </Link>
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
