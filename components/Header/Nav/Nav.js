import Link from "next/link";
import styles from "./style/Nav.module.css";
import ColorModeButton from "../ColorModeButton/ColorModeButton";

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
                className={
                    styles[
                        `header-overlay ${
                            navIsActive ? "overlayIn" : "overlayOut"
                        }`
                    ]
                }
                onClick={closeNav}
            ></div>

            <nav
                className={styles[`header-nav ${navIsActive ? "nav-on" : ""}`]}
            >
                <ul>
                    {links.map((link, i) => (
                        <Link href={link.to} onClick={() => closeNav()} key={i}>
                            <a>
                                <li>{link.title} </li>
                            </a>
                        </Link>
                    ))}
                </ul>
                {width <= 720 && <ColorModeButton />}
            </nav>
        </>
    );
}
