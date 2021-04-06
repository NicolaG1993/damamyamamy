import React from "react";
import CartItem from "./cart-item/CartItem";

export default function Cart({ cart, removeFromCart, emptyCart }) {
    // console.log("cart in Cart.js: ", cart);

    const EmptyCart = () => <p>Nessun prodotto nel tuo carrello</p>;

    const FilledCart = () => (
        <div className={"cart-container"}>
            <div className={"products"}>
                {cart.line_items.map((item) => (
                    <div className={"product-box"} key={item.id}>
                        <CartItem item={item} removeFromCart={removeFromCart} />
                    </div>
                ))}
            </div>
            <div className={"cart-interact"}>
                <h3>Importo: {cart.subtotal.formatted_with_symbol}</h3>
                <button className={"empty-btn"} onClick={emptyCart}>
                    Svuota il carrello
                </button>
                <button className={"checkout-btn"}>Alla cassa</button>
            </div>
        </div>
    );

    if (!cart) return <p>Loading...</p>;

    return (
        <div className={"cart-comp"}>
            <h3>Il tuo carrello</h3>

            {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
        </div>
    );
}
