import { Link } from "react-router-dom";
import ColorModeButton from "./ColorModeButton";
import "../../styles/Nav.css";

export default function Nav({ navIsActive, toggleNav, windowWidth }) {
    return (
        <>
            <div
                className={`overlay ${
                    navIsActive ? "overlayIn" : "overlayOut"
                }`}
                onClick={toggleNav}
            ></div>

            <nav id="nav" className={`${navIsActive ? "on" : ""}`}>
                <div>
                    <Link to={"/"} onClick={toggleNav}>
                        <p>Home</p>
                    </Link>

                    <Link to={"/about"} onClick={toggleNav}>
                        <p>Chi siamo</p>
                    </Link>

                    <Link to={"/shop"} onClick={toggleNav}>
                        <p>In negozio</p>
                    </Link>

                    <Link to={"/contact"} onClick={toggleNav}>
                        <p>Contatto</p>
                    </Link>

                    <a href="/?">
                        <p>Vendi</p>
                    </a>
                </div>

                {windowWidth <= 720 && (
                    <>
                        <ColorModeButton />
                    </>
                )}
            </nav>
        </>
    );
}
