import axios from "./axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Logo from "./components/logo";
import Auth from "./components/auth/Auth";
import Slider from "./components/slider/Slider";
import images from "./images";
import ItemsListShort from "./components/items-list-short/ItemsListShort";
import PostsListShort from "./components/posts-list-short/PostsListShort";

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

        try {
            const { data } = await axios.get("/user");
            console.log("data: ", data);

            this.setState({
                id: data.id || "",
                first: data.first || "",
                last: data.last || "",
                profilePicUrl: data.profile_pic_url || "",
                bio: data.bio || "",
            });
        } catch (err) {
            console.log("err in app-->componentDidMount: ", err);
        }
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
                        <div className={"auth-box"}>
                            <Auth />
                        </div>

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
                        <h1>Da Mamy a Mamy App</h1>
                        <Slider slides={images} />

                        <div className={"shop-items shortlist"}>
                            <h2>Articoli in negozio</h2>
                            <ItemsListShort />
                        </div>

                        <div className={"users-items shortlist"}>
                            <h2>Articoli della community</h2>
                            <ItemsListShort />
                        </div>

                        <div className={"users-posts shortlist"}>
                            <h2>Posts recenti</h2>
                            <PostsListShort />
                        </div>
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
                                <a href="mailto:damamyamamy@gmail.com">
                                    damamyamamy@gmail.com
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
