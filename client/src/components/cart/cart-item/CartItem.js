import React from "react";
import { Link } from "react-router-dom";

export default function CartItem({ item, removeFromCart }) {
    console.log("props in CartItem.js: ", item);
    return (
        <div>
            <div className={"cart-product-content"}>
                <Link to={`/item/${item.product_id}`}>
                    <img src={item.media.source} alt={item.name} />
                    <div className="cart-product-info">
                        <h4>{item.name}</h4>
                        <h5>€ {item.price.raw}</h5>
                    </div>
                </Link>
                <button
                    className="cart-remove-button"
                    onClick={() => removeFromCart(item.id)}
                >
                    X
                </button>
            </div>

            <div className="white-separator"></div>
        </div>
    );
}

// btn deve switchare to remove se item é gia in cart 🐔
