import axios from "./axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Logo from "./components/logo";
import Slider from "./components/slider/Slider";
import images from "./images";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsActive: false,
        };

        this.toggleNav = this.toggleNav.bind(this);
    }

    async componentDidMount() {
        console.log("App component did mount");
    }

    toggleNav() {
        this.setState({ navIsActive: !this.state.navIsActive });
    }

    render() {
        return (
            <BrowserRouter>
                <div className={"App"}>
                    <div className={"header"}>
                        <Link to={"/"}>
                            <Logo />
                        </Link>

                        <div
                            id="hamBtn"
                            className={this.state.navIsActive ? "active" : ""}
                            onClick={this.toggleNav}
                        >
                            <div className={"stick"}></div>
                        </div>
                    </div>

                    <div
                        className={`overlay ${
                            this.state.navIsActive ? "overlayIn" : "overlayOut"
                        }`}
                        onClick={this.toggleNav}
                    ></div>

                    <nav
                        id="nav"
                        className={`${this.state.navIsActive ? "on" : ""}`}
                    >
                        <p>
                            <a href="/noi">Chi siamo</a>
                        </p>
                        <p>
                            <a href="/shop">Prodotti</a>
                        </p>
                        <p>
                            <a href="/servizi">Servizi</a>
                        </p>
                        <p>
                            <a href="/contatto">Contatto</a>
                        </p>
                    </nav>

                    <div className={"main"}>
                        <h1>Hello im App!</h1>
                        <Slider slides={images} />
                    </div>

                    <div className={"footer"}>
                        <div id="contact-footer">
                            <p>Vicolo Teatro, 4, 37010</p>
                            <p>Cavaion, Verona, IT</p>
                            <p>
                                <a href="tel:+393479792644">
                                    (+39) 347 9792 644
                                </a>
                            </p>
                            <p>
                                <a href="mailto:damamyamay@gmail.com">
                                    damamyamay@gmail.com
                                </a>
                            </p>
                        </div>

                        <div className={"copyrights"}>
                            Da Mamy a Mamy, © 2021
                        </div>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}
