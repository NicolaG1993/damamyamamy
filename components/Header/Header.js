// REACT
import { useEffect, useState } from "react";
import Link from "next/link";
import useWindowDimensions from "../../shared/utils/useWindowDimensions";
import "./style/Header.module.css";

// REDUX
// import { useDispatch } from "react-redux";
// import { toggleLayout } from "../../redux/ToggleLayout/toggleLayout.actions";

// COMPONENTS
// import Logo from "../Logo/Logo";
// import CartIcon from "../Cart/CartIcon/CartIcon";
// import HamburgerButton from "./HamburgerButton/HamburgerButton";
// import ColorModeButton from "../ColorModeButton/ColorModeButton";
// import Nav from "./Nav/Nav";

export default function Header() {
    const [windowSize, setWindowSize] = useState(721);
    const { width } = useWindowDimensions();

    useEffect(() => {
        setWindowSize(width);
    }, []);
    //senza questo passaggio abbiamo errore in console, perché width torna 0 in SSR
    //quindi abbiamo mobile header anche se siamo in desktop
    // e non contiene questo component.
    // cosí ci torna SEMPRE prima l'header di desktop, in SSR e client, poi vede quale mettere alla fine
    // e controlliamo poi normalmente se cambia ancora, funziona
    // un'alternativa é usare loadable per tutto header con un fallback, ma non mi sembrava ideale

    // forse l'ideale sarebbe leggere il device da cui viene effettuata la richiesta? e in base a quello fare un render SSR per small or large device

    useEffect(() => {
        setWindowSize(width);
        width > 720 && close;
    }, [width]); // mi serve?

    // REDUX
    // const dispatch = useDispatch();
    // const toggle = () => {
    //     dispatch(toggleLayout({ id: "nav", fn: "toggle" }));
    // };
    // const close = () => {
    //     dispatch(toggleLayout({ id: "nav", fn: "close" }));
    // };

    // SMALL COMPONENTS
    const LogoLink = () => (
        <div className="logo-wrap">
            <Link to={"/"} onClick={close}>
                {/* <Logo /> */}
            </Link>
        </div>
    );
    const MobileHeader = () => (
        <div className="header-wrap">
            {/* <LogoLink />
            <CartIcon />
            <HamburgerButton toggleNav={toggle} /> */}
        </div>
    );
    const DesktopHeader = () => (
        <div className="header-wrap">
            <h5>Header</h5>
            {/* <LogoLink />
            <CartIcon />
            <div className="header-buttons-box-right">
                <ColorModeButton />
                <HamburgerButton toggleNav={toggle} />
            </div> */}
        </div>
    );

    return (
        <header id="Header">
            <div className="header-component">
                {windowSize <= 720 ? <MobileHeader /> : <DesktopHeader />}
            </div>
            {/* <Nav closeNav={close} width={windowSize} /> */}
        </header>
    );
}
