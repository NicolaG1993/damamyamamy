import loadable from "@loadable/component";
import { Link } from "react-router-dom";
import "./style/Nav.css";
const ColorModeButton = loadable(() =>
    import("../../ColorModeButton/ColorModeButton")
);

// REDUX
import { useSelector, shallowEqual } from "react-redux";
const selectLayouts = (state) => state.toggleLayout.layouts[1];

const links = [
    {
        to: "/",
        title: "Home",
    },
    {
        to: "/about",
        title: "Chi siamo",
    },
    {
        to: "/shop",
        title: "In negozio",
    },
    {
        to: "/contact",
        title: "Contatto",
    },
    {
        to: "/document",
        title: "Vendi",
    },
];

export default function Nav({ closeNav, width }) {
    let state = useSelector(selectLayouts, shallowEqual);
    let navIsActive = state.active;

    return (
        <>
            <div
                className={`header-overlay ${
                    navIsActive ? "overlayIn" : "overlayOut"
                }`}
                onClick={closeNav}
            ></div>

            <nav className={`header-nav ${navIsActive ? "nav-on" : ""}`}>
                <ul>
                    {links.map((link, i) => (
                        <Link to={link.to} onClick={() => closeNav()} key={i}>
                            <li>{link.title} </li>
                        </Link>
                    ))}
                </ul>
                {width <= 720 && (
                    <ColorModeButton fallback={<div className="loader" />} />
                )}
            </nav>
        </>
    );
}
