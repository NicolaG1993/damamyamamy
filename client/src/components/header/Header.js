import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import CartIcon from "../cart/CartIcon";

export default function Header({ navIsActive, closeNav, toggleNav, cart }) {
    return (
        <div className={"header"}>
            <Link to={"/"} onClick={closeNav}>
                <Logo />
            </Link>

            <CartIcon cart={cart} />

            <div
                id="hamBtn"
                className={navIsActive ? "active" : ""}
                onClick={toggleNav}
            >
                <div className={"stick"}></div>
            </div>
        </div>
    );
}
