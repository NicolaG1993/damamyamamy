import { useEffect } from "react";
import Link from "next/link";

import CartItem from "../components/Cart/CartItem/CartItem";
import Button from "../components/Button/Button";

import styles from "../components/Cart/style/Cart.module.css";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { emptyCart } from "../redux/LoadCart/loadCart.actions";
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
        <div className={styles["cart-container"]}>
            <div className={styles["cart-products"]}>
                {cart.line_items.map((item) => (
                    <div className={styles["cart-product-box"]} key={item.id}>
                        <CartItem item={item} styles={styles} />
                    </div>
                ))}
            </div>
            <div className={styles["cart-interact"]}>
                <div className={styles["cart-total"]}>
                    <span></span>
                    <h3>
                        Totale: <br />
                        {cart.subtotal.formatted_with_symbol}
                    </h3>
                </div>

                <span></span>

                <div className={styles["cart-btns"]}>
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
        <div id={styles["cart-comp"]}>
            <div className={styles["cart-comp-wrapper"]}>
                <h2>Il tuo carrello</h2>

                {!cart.line_items.length ? <EmptyCart /> : <FilledCart />}
            </div>
        </div>
    );
}
