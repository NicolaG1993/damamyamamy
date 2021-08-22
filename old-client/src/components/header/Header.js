import { useState } from "react";
import { Link } from "react-router-dom";
import Nav from "./Nav";
import Logo from "../logo/Logo";
import CartIcon from "../cart/CartIcon";
import ColorModeButton from "./ColorModeButton";
import "../../styles/Header.css";

export default function Header({ cart, windowWidth }) {
    const [navIsActive, setNavIsActive] = useState();
    const toggleNav = async () => setNavIsActive(!navIsActive);
    const closeNav = async () => setNavIsActive(false);
    // console.log("Header renders");

    return (
        <>
            <div className={"header"}>
                <div className={"header-logo-box"}>
                    <Link to={"/"} onClick={closeNav}>
                        <Logo />
                    </Link>
                </div>

                <CartIcon cart={cart} closeNav={closeNav} />

                {windowWidth <= 720 ? (
                    <div
                        id="hamBtn"
                        className={navIsActive ? "hamBtn active" : "hamBtn"}
                        onClick={toggleNav}
                    >
                        <div className={"stick"}></div>
                    </div>
                ) : (
                    <div className="header-buttons-box-right">
                        <ColorModeButton />
                        <div
                            id="hamBtn"
                            className={navIsActive ? "hamBtn active" : "hamBtn"}
                            onClick={toggleNav}
                        >
                            <div className={"stick"}></div>
                        </div>
                    </div>
                )}
            </div>
            <Nav
                navIsActive={navIsActive}
                closeNav={closeNav}
                toggleNav={toggleNav}
                windowWidth={windowWidth}
            />
        </>
    );
}
//Ho dovuto aggiungere la classe hamBtn perché uso una variante in filter-bar di Shop

//se width > tot torna un div con hamburger e color toggle
//altrimenti solo hamburger - color toggle invece va in nav
