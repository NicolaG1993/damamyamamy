import React from "react";
import { Link } from "react-router-dom";

export default function CartIcon(props) {
    // console.log("props in CartIcon.js: ", props);

    return (
        <div className={"cart-icon-box"}>
            <Link to={"/cart"}>
                <div className={"cart-icon"}></div>

                {props.cart && (
                    <div id="cartCounter">{props.cart.total_items}</div>
                )}
            </Link>
        </div>
    );
}
