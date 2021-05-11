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
            </nav>
        </>
    );
}
