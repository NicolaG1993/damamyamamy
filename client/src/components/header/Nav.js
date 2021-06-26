import { Link } from "react-router-dom";
import ColorModeButton from "./ColorModeButton";
import "../../styles/Nav.css";

export default function Nav({ navIsActive, toggleNav, closeNav, windowWidth }) {
    return (
        <>
            <div
                className={`overlay ${
                    navIsActive ? "overlayIn" : "overlayOut"
                }`}
                onClick={closeNav}
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

                    <Link to={"/regolamento"} onClick={toggleNav}>
                        <p>Vendi</p>
                    </Link>
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
