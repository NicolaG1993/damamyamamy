// REACT
import loadable from "@loadable/component";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useWindowDimensions from "../../utils/useWindowDimensions";
import "./style/Header.css";

// REDUX
import { useDispatch } from "react-redux";
import { toggleLayout } from "../../redux/ToggleLayout/toggleLayout.actions";

// COMPONENTS
const Logo = loadable(() => import("../Logo/Logo"));
import CartIcon from "../Cart/CartIcon/CartIcon";
const HamburgerButton = loadable(() =>
    import("./HamburgerButton/HamburgerButton")
);
const ColorModeButton = loadable(() =>
    import("../ColorModeButton/ColorModeButton")
);
const Nav = loadable(() => import("./Nav/Nav"));

export default function Header() {
    const { width } = useWindowDimensions();
    useEffect(() => {
        width > 720 && close;
    }, [width]); // mi serve?

    // REDUX
    const dispatch = useDispatch();
    const toggle = () => {
        dispatch(toggleLayout({ id: "nav", fn: "toggle" }));
    };
    const close = () => {
        dispatch(toggleLayout({ id: "nav", fn: "close" }));
    };

    // SMALL COMPONENTS
    const LogoLink = () => (
        <div className="logo-wrap">
            <Link to={"/"} onClick={close}>
                <Logo fallback={<div className="loader" />} />
            </Link>
        </div>
    );
    const MobileHeader = () => (
        <div className="header-wrap">
            <LogoLink />
            <CartIcon />
            <HamburgerButton toggleNav={toggle} />
        </div>
    );
    const DesktopHeader = () => (
        <div className="header-wrap">
            <LogoLink />
            <CartIcon />
            {/* <h3 className="cart-btn">CART</h3> */}
            <div className="header-buttons-box-right">
                <ColorModeButton fallback={<div className="loader" />} />
                <HamburgerButton toggleNav={toggle} />
            </div>
        </div>
    );

    return (
        <div id="Header">
            <div className="header-component">
                {width <= 720 ? <MobileHeader /> : <DesktopHeader />}
            </div>
            <Nav
                fallback={<div className="loader" />}
                closeNav={close}
                width={width}
            />
        </div>
    );
}
