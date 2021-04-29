import React from "react";
import { Link } from "react-router-dom";

export default function Nav({ navIsActive, toggleNav }) {
    return (
        <>
            <div
                className={`overlay ${
                    navIsActive ? "overlayIn" : "overlayOut"
                }`}
                onClick={toggleNav}
            ></div>

            <nav id="nav" className={`${navIsActive ? "on" : ""}`}>
                <p>
                    <Link to={"/about"} onClick={toggleNav}>
                        Chi siamo
                    </Link>
                </p>
                <p>
                    <Link to={"/shop"} onClick={toggleNav}>
                        Prodotti
                    </Link>
                </p>
                <p>
                    <Link to={"/contact"} onClick={toggleNav}>
                        Contatto
                    </Link>
                </p>
                <p>
                    <a href="/?">Vendi</a>
                </p>
            </nav>
        </>
    );
}
