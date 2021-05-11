import React from "react";
import { Link } from "react-router-dom";

export default function CartIcon({ cart, closeNav }) {
    // console.log("props in CartIcon.js: ", props);

    return (
        <div className={"cart-icon-box"}>
            <Link to={"/cart"} onClick={closeNav}>
                <div className={"cart-icon"}></div>

                {cart && <div id="cartCounter">{cart.total_items}</div>}
            </Link>
        </div>
    );
}
