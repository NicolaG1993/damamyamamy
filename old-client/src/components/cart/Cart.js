import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "./cart-item/CartItem";
import "../../styles/Cart.css";

export default function Cart({ cart, removeFromCart, emptyCart }) {
    // console.log("cart in Cart.js: ", cart);

    useEffect(() => {
        document.querySelectorAll(".product-box").forEach((el) => {
            el.classList.add("fade-in");
        });
    });

    useEffect(() => {
        console.log("mounted");
        window.scrollTo(0, 0);
    }, []);

    const EmptyCart = () => (
        <>
            <p>Nessun prodotto nel tuo carrello</p>
            <br />
            <br />
            <Link to="/shop">
                <button className={"layout-button btn-dark1"}>
                    Vai al negozio
                </button>
            </Link>
        </>
    );

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
                    <h3 className="second-font">
                        Totale: <br />
                        {cart.subtotal.formatted_with_symbol}
                    </h3>
                </div>

                <span></span>

                <div className="cart-btns">
                    <button
                        className={"empty-btn layout-button btn-dark1"}
                        onClick={emptyCart}
                    >
                        Svuota il carrello
                    </button>

                    <Link to="/checkout">
                        <button
                            className={"checkout-btn layout-button btn-dark1"}
                        >
                            Vai alla cassa
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );

    if (!cart) return <p>Loading...</p>;

    return (
        <div id="cart-comp">
            <div className={"cart-comp-wrapper"}>
                <h2 className="second-font">Il tuo carrello</h2>

                {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
            </div>
        </div>
    );
}