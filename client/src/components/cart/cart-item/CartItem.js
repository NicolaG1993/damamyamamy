import React from "react";

export default function CartItem({ item, removeFromCart }) {
    console.log("props in CartItem.js: ", item);
    return (
        <div className={"product-content"}>
            <img src={item.media.source} alt={item.name} />
            <h4>{item.name}</h4>
            <h5>{item.line_total.formatted_with_symbol}</h5>
            <button onClick={() => removeFromCart(item.id)}>Rimuovi</button>
        </div>
    );
}
