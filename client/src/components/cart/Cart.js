import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "./cart-item/CartItem";

export default function Cart({ cart, removeFromCart, emptyCart }) {
    // console.log("cart in Cart.js: ", cart);

    useEffect(() => {
        document.querySelectorAll(".product-box").forEach((el) => {
            el.classList.add("fade-in");
        });
    });

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const EmptyCart = () => <p>Nessun prodotto nel tuo carrello</p>;

    const FilledCart = () => (
        <div className={"cart-container"}>
            <div className={"cart-products"}>
                {cart.line_items.map((item) => (
                    <div className={"cart-product-box"} key={item.id}>
                        <CartItem item={item} removeFromCart={removeFromCart} />
                    </div>
                ))}
            </div>
            <div className={"cart-interact"}>
                <div className="cart-total">
                    <span></span>
                    <h3>
                        Totale: <br />
                        {cart.subtotal.formatted_with_symbol}
                    </h3>
                </div>

                <span></span>

                <div className="cart-btns">
                    <button
                        className={"empty-btn layout-button-dark"}
                        onClick={emptyCart}
                    >
                        Svuota il carrello
                    </button>

                    <Link to="/checkout">
                        <button className={"checkout-btn layout-button-dark"}>
                            Vai alla cassa
                        </button>
                    </Link>
                </div>
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
