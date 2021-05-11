import React from "react";
import { Link } from "react-router-dom";
import Logo from "../logo/Logo";
import CartIcon from "../cart/CartIcon";

export default function Header({ navIsActive, closeNav, toggleNav, cart }) {
    return (
        <div className={"header"}>
            <div className={"header-logo-box"}>
                <Link to={"/"} onClick={closeNav}>
                    <Logo />
                </Link>
            </div>

            <CartIcon cart={cart} closeNav={closeNav} />

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
