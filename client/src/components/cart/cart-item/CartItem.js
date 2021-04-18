import React from "react";
import { Link } from "react-router-dom";

export default function CartItem({ item, removeFromCart }) {
    console.log("props in CartItem.js: ", item);
    return (
        <div className={"product-content"}>
            <Link to={`/item/${item.product_id}`}>
                <img src={item.media.source} alt={item.name} />
                <h4>{item.name}</h4>
                <h5>{item.line_total.formatted_with_symbol}</h5>
            </Link>
            <button onClick={() => removeFromCart(item.id)}>Rimuovi</button>
        </div>
    );
}

// btn deve switchare to remove se item é gia in cart 🐔
