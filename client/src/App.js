import axios from "./axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Logo from "./components/logo";
import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Registration from "./components/auth/Registration";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsActive: false,
            accessFormIsActive: false,
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.toggleAccessForm = this.toggleAccessForm.bind(this);
    }

    async componentDidMount() {
        console.log("App component did mount");

        try {
            const { data } = await axios.get("/user");
            console.log("user: ", data);

            this.setState({
                id: data.id,
                first: data.first,
                last: data.last,
                profilePicUrl: data.profile_pic_url,
                bio: data.bio,
            });
        } catch (err) {
            console.log("err in app-->componentDidMount: ", err);
        }
    }

    toggleNav() {
        this.setState({ navIsActive: !this.state.navIsActive });
    }

    toggleAccessForm() {
        console.log("toggleAccessForm activated");
        this.setState({ accessFormIsActive: !this.state.accessFormIsActive });
    }

    render() {
        console.log("this.state in app: ", this.state);

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
                        <div className={"auth-box"} onClick={this.toggleNav}>
                            <Auth
                                userId={this.state.id}
                                toggleAccessForm={this.toggleAccessForm}
                            />
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

                    {!this.state.id && (
                        <div
                            className={
                                this.state.accessFormIsActive
                                    ? "visible"
                                    : "hidden"
                            }
                        >
                            <Login accessForm={this.state.accessFormIsActive} />
                        </div>
                    )}

                    <div className={"main"}>
                        <h1>Da Mamy a Mamy App</h1>
                        {this.state.error && <p>Something broke :(</p>}

                        <Route exact path="/" render={() => <Home />} />

                        {/* <Route path="/login" render={() => <Login />} />
                        <Route
                            path="/registration"
                            render={() => <Registration />}
                        /> */}
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
