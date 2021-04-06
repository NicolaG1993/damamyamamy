import React from "react";
import { Link } from "react-router-dom";

export default function CartIcon({ cart }) {
    // console.log("props in CartIcon.js: ", props);

    return (
        <div className={"cart-icon-box"}>
            <Link to={"/cart"}>
                <div className={"cart-icon"}></div>

                {cart && <div id="cartCounter">{cart.total_items}</div>}
            </Link>
        </div>
    );
}
