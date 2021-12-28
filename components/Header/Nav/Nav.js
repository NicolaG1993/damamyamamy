import Link from "next/link";
import styles from "./style/Nav.module.css";
import ColorModeButton from "../ColorModeButton/ColorModeButton";

// REDUX
import { useSelector, shallowEqual, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { userLogout } from "../../../redux/User/user.actions";
import { useRouter } from "next/router";
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
        to: "/info/vendi",
        title: "Vendi",
    },
];

export default function Nav({ closeNav, width, userInfo }) {
    const router = useRouter();
    const dispatch = useDispatch();
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

    const logoutClickHandler = () => {
        dispatch(userLogout());
        Cookies.remove("userInfo");
        Cookies.remove("cartItems");
        closeNav();
        router.push("/");
    };

    return (
        <>
            <div className={getOverlayStyle()} onClick={closeNav}></div>

            <nav className={getNavStyle()}>
                <ul className={styles["header-nav-ul"]}>
                    {links.map((link, i) => (
                        <Link href={link.to} key={i}>
                            <a onClick={() => closeNav()}>
                                <li>{link.title} </li>
                            </a>
                        </Link>
                    ))}
                    {userInfo ? (
                        <>
                            <Link href="/profile">
                                <a onClick={() => closeNav()}>
                                    <li>Profilo</li>
                                </a>
                            </Link>
                            <Link href="/login">
                                <a onClick={logoutClickHandler}>
                                    <li>Logout</li>
                                </a>
                            </Link>
                            {/* aggiungere if userInfo.isAdmin una volta creato primo admin */}
                            {userInfo.is_admin && (
                                <Link href="/admin/dashboard">
                                    <a onClick={() => closeNav()}>
                                        <li>Area admin</li>
                                    </a>
                                </Link>
                            )}
                        </>
                    ) : (
                        <Link href="/login">
                            <a onClick={() => closeNav()}>
                                <li>Login</li>
                            </a>
                        </Link>
                    )}
                </ul>
                {width <= 720 && <ColorModeButton />}
            </nav>
        </>
    );
}
