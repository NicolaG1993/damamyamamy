import React from "react";
import { Link } from "react-router-dom";

export default function Cart(props) {
    console.log("props in Cart.js: ", props);
    const isEmpty = true;

    const EmptyCart = () => <p>Nessun prodotto nel tuo carrello</p>;

    const FilledCart = () => <div className={"cart"}></div>;

    return (
        <div className={"cart-comp"}>
            <h3>Il tuo carrello</h3>

            {isEmpty ? <EmptyCart /> : <FilledCart />}
        </div>
    );
}
