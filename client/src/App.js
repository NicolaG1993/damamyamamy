import axios from "./axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { commerce } from "./lib/commerce";

import Logo from "./components/logo";
import Footer from "./components/Footer";

import Home from "./components/home/Home";

import About from "./components/shop/About";
import Shop from "./components/shop/Shop";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsActive: false,
            accessFormIsActive: false,
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.toggleAccessForm = this.toggleAccessForm.bind(this);
        this.setProfilePicUrl = this.setProfilePicUrl.bind(this);
    }

    async componentDidMount() {
        console.log("App component did mount");

        try {
            // const { data } = await axios.get("/user");
            // console.log("user: ", data);
            const { data } = await commerce.products.list();
            console.log("products: ", data);

            this.setState({
                products: data,
            });
        } catch (err) {
            console.log("err in app-->componentDidMount: ", err);
        }
    }

    toggleNav() {
        this.setState({ navIsActive: !this.state.navIsActive });
    }

    closeNav() {
        this.setState({ navIsActive: false });
    }

    toggleAccessForm() {
        console.log("toggleAccessForm activated");
        this.setState({ accessFormIsActive: !this.state.accessFormIsActive });
    }

    setProfilePicUrl(profilePicUrl) {
        console.log("setProfilePicUrl activated");
        this.setState({
            profilePicUrl: profilePicUrl,
            uploaderVisible: false,
        });
    }

    render() {
        console.log("this.state in app: ", this.state);

        return (
            <BrowserRouter>
                <div className={"App"}>
                    <div className={"header"}>
                        <Link to={"/"} onClick={this.closeNav}>
                            <Logo />
                        </Link>

                        <div id="cartIcon">
                            <div id="cartCounter">2</div>
                        </div>

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
                            <Link to={"/about"} onClick={this.toggleNav}>
                                Chi siamo
                            </Link>
                        </p>
                        <p>
                            <Link to={"/shop"} onClick={this.toggleNav}>
                                Prodotti
                            </Link>
                        </p>
                        <p>
                            <a href="/contatto">Contatto</a>
                        </p>
                        <p>
                            <a href="/?">Vendi</a>
                        </p>
                    </nav>

                    <div className={"main"}>
                        {this.state.error && <p>Something broke :(</p>}

                        <Route exact path="/" render={() => <Home />} />

                        <Route path="/about" render={() => <About />} />
                        <Route
                            path="/shop"
                            render={() => (
                                <Shop products={this.state.products} />
                            )}
                        />
                    </div>

                    <Footer />
                </div>
            </BrowserRouter>
        );
    }
}

/*

MIGLIORIE:
🐲 🐔
creare un header component 🐔
creare un footer component 🐲

fare funzioni async, ma quali e come? 🐔

dovrei fare solo fn components? app incluso ed usare hooks (informarsi) 🐔


*/
