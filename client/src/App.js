import axios from "./axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import Logo from "./components/logo";
import Footer from "./components/Footer";

import Home from "./components/home/Home";
import Auth from "./components/auth/Auth";
import Access from "./components/auth/Access";
import Profile from "./components/profile/Profile";
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
        this.toggleAccessForm = this.toggleAccessForm.bind(this);
        this.setProfilePicUrl = this.setProfilePicUrl.bind(this);
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
                                firstName={this.state.first}
                                lastName={this.state.last}
                                profilePicUrl={this.state.profilePicUrl}
                            />
                        </div>

                        {this.state.id && (
                            <a href="/logout" onClick={this.toggleNav}>
                                Logout
                            </a>
                        )}

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
                            <a href="/communityShop">Mercatino digitale</a>
                        </p>
                        <p>
                            <a href="/contatto">Contatto</a>
                        </p>
                        <p>
                            <a href="/?">Vendi</a>
                        </p>
                    </nav>

                    {!this.state.id && (
                        <div>
                            <Access
                                accessForm={this.state.accessFormIsActive}
                                toggleAccessForm={this.toggleAccessForm}
                            />
                        </div>
                    )}

                    <div className={"main"}>
                        {this.state.error && <p>Something broke :(</p>}

                        <Route exact path="/" render={() => <Home />} />
                        <Route
                            path="/profile"
                            render={() => (
                                <Profile
                                    firstName={this.state.first}
                                    lastName={this.state.last}
                                    profilePicUrl={this.state.profilePicUrl}
                                    bio={this.state.bio}
                                />
                            )}
                        />
                        <Route path="/about" render={() => <About />} />
                        <Route path="/shop" render={() => <Shop />} />
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


*/
