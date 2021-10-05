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
        to: "/chi-siamo",
        title: "Chi siamo",
    },
    {
        to: "/shop",
        title: "In negozio",
    },
    {
        to: "/contatto",
        title: "Contatto",
    },
    {
        to: "/regolamento",
        title: "Vendi",
    },
];

export default function Nav({ closeNav, width }) {
    let { active } = useSelector(selectLayouts, shallowEqual);
    // let navIsActive = state.active;

    const getOverlayStyle = () => {
        if (active) return styles["header-overlay-in"];
        else return styles["header-overlay-out"];
    };
    const getNavStyle = () => {
        if (active) return styles["header-nav-on"];
        else return styles["header-nav-off"];
    };

    return (
        <>
            <div className={getOverlayStyle()} onClick={closeNav}></div>

            <nav className={getNavStyle()}>
                <ul>
                    {links.map((link, i) => (
                        <Link href={link.to} key={i}>
                            <a onClick={() => closeNav()}>
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
