import { useEffect } from "react";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import Button from "../Button/Button";
import "./style/Cart.css";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { emptyCart } from "../../redux/LoadCart/loadCart.actions";
const selectCart = (state) => state.loadCart.cart;

export default function Cart() {
    const dispatch = useDispatch();
    let cart = useSelector(selectCart, shallowEqual);
    console.log("cart in Cart.js: ", cart);

    useEffect(() => {
        document.querySelectorAll(".product-box").forEach((el) => {
            el.classList.add("fade-in");
        });
    });

    const EmptyCart = () => (
        <>
            <p>Nessun prodotto nel tuo carrello</p>
            <br />
            <br />
            <Button
                page="/shop"
                text="Vai al negozio"
                type="internal"
                style="inverted-btn"
            />
        </>
    );

    const FilledCart = () => (
        <div className={"cart-container"}>
            <div className={"cart-products"}>
                {cart.line_items.map((item) => (
                    <div className={"cart-product-box"} key={item.id}>
                        <CartItem item={item} />
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
                    <Button
                        text="Svuota il carrello"
                        type="function"
                        fn={() => dispatch(emptyCart())}
                        style="inverted-btn"
                    />
                    <Button
                        page="/checkout"
                        text="Vai alla cassa"
                        type="internal"
                        style="inverted-btn"
                    />
                </div>
            </div>
        </div>
    );

    if (!cart) return <p>Loading...</p>;

    return (
        <div id="cart-comp">
            <div className={"cart-comp-wrapper"}>
                <h2>Il tuo carrello</h2>

                {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
            </div>
        </div>
    );
}
