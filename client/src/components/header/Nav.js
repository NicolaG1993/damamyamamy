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
                        CHI SIAMO
                    </Link>
                </p>
                <p>
                    <Link to={"/shop"} onClick={toggleNav}>
                        IN NEGOZIO
                    </Link>
                </p>
                <p>
                    <Link to={"/contact"} onClick={toggleNav}>
                        CONTATTO
                    </Link>
                </p>
                <p>
                    <a href="/?">VENDI</a>
                </p>
            </nav>
        </>
    );
}
