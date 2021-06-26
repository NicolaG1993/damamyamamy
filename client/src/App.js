// import axios from "./axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import { connect } from "react-redux";
import { loadData } from "./redux/actions";

import { commerce } from "./lib/commerce";

import { Header, Nav, Footer } from "./components";
import { Home, About, Contact, Shop, Item, Cart, Checkout } from "./components";
import {
    FAQ,
    PrivacyAndCookiePolicy,
    Regolamento,
    TermsAndConditions,
} from "./components";
import DocExample from "./components/docs/DocExample";
import CookiesPopUp from "./components/alerts/CookiesPopUp";

import { keepTheme } from "./utils/themes";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsActive: false,
            notAvailables: [],
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
            cookieAlertIsActive: true,
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
        this.handleEmptyCart = this.handleEmptyCart.bind(this);
        this.handleCaptureCheckout = this.handleCaptureCheckout.bind(this);
        this.refreshCart = this.refreshCart.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.toggleCookieAlert = this.toggleCookieAlert.bind(this);
    }

    async componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        keepTheme(); // ?

        try {
            this.props.dispatch(loadData());

            const cart = await commerce.cart.retrieve();
            const addedItems = cart.line_items.map((obj) => ({
                item_id: obj.id,
                product_id: obj.product_id,
            })); //scriverla una sola volta con componentDidUpdate ?
            // console.log("addedItems: ", addedItems); // array con tutti i product_id ed item_id in cart

            this.setState({
                cart: cart,
                notAvailables: addedItems,
            });
        } catch (err) {
            console.log("err in app-->componentDidMount: ", err);
        }
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateWindowDimensions);
    }

    toggleNav() {
        this.setState({ navIsActive: !this.state.navIsActive });
    }

    closeNav() {
        this.setState({ navIsActive: false });
    }

    async handleAddToCart(productId, quantity) {
        const item = await commerce.cart.add(productId, quantity);
        const addedItems = item.cart.line_items.map((obj) => ({
            item_id: obj.id,
            product_id: obj.product_id,
        }));

        this.setState({
            cart: item.cart,
            notAvailables: addedItems,
        });
    }
    async handleRemoveFromCart(productId) {
        const item = await commerce.cart.remove(productId);
        const addedItems = item.cart.line_items.map((obj) => ({
            item_id: obj.id,
            product_id: obj.product_id,
        }));

        this.setState({
            cart: item.cart,
            notAvailables: addedItems,
        });
    }
    async handleEmptyCart() {
        const item = await commerce.cart.empty();
        const addedItems = item.cart.line_items.map((obj) => ({
            item_id: obj.id,
            product_id: obj.product_id,
        }));

        this.setState({
            cart: item.cart,
            notAvailables: addedItems,
        });
    }

    async refreshCart() {
        const newCart = await commerce.cart.refresh();

        this.setState({
            cart: newCart,
            notAvailables: [],
        });
    }

    async handleCaptureCheckout(checkoutTokenId, newOrder) {
        if (checkoutTokenId === "test") {
            //this is only for test
            this.handleEmptyCart();
        } else {
            try {
                const incomingOrder = await commerce.checkout.capture(
                    checkoutTokenId,
                    newOrder
                );
                this.setState({
                    order: incomingOrder,
                });
                this.refreshCart();
            } catch (err) {
                this.setState({ errorMessage: err.data.error.message });
            }
        }
    }

    updateWindowDimensions() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });
    }

    toggleCookieAlert() {
        this.setState({ cookieAlertIsActive: !this.state.cookieAlertIsActive });
    }

    render() {
        // console.log("this.state in app: ", this.state);
        // console.log("redux state in app: ", this.props.state);
        let reduxState = this.props.state;

        return (
            <BrowserRouter>
                <div className={"App"}>
                    {this.state.cookieAlertIsActive && (
                        <CookiesPopUp
                            toggleCookieAlert={this.toggleCookieAlert}
                        />
                    )}

                    <Header
                        navIsActive={this.state.navIsActive}
                        closeNav={this.closeNav}
                        toggleNav={this.toggleNav}
                        cart={this.state.cart}
                        windowWidth={this.state.windowWidth}
                    />
                    <Nav
                        navIsActive={this.state.navIsActive}
                        closeNav={this.closeNav}
                        toggleNav={this.toggleNav}
                        windowWidth={this.state.windowWidth}
                    />

                    <div className={"main"}>
                        {this.state.error && <p>Something broke :(</p>}

                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Home
                                    notAvailables={this.state.notAvailables}
                                    onAddToCart={this.handleAddToCart}
                                    removeFromCart={this.handleRemoveFromCart}
                                    windowWidth={this.state.windowWidth}
                                />
                            )}
                        />

                        <Route exact path="/about" render={() => <About />} />
                        <Route
                            exact
                            path="/contact"
                            render={() => <Contact />}
                        />
                        <Route
                            exact
                            path="/shop"
                            tag=""
                            render={(props) => (
                                <Shop
                                    notAvailables={this.state.notAvailables}
                                    onAddToCart={this.handleAddToCart}
                                    removeFromCart={this.handleRemoveFromCart}
                                    research={props.location.tag}
                                />
                            )}
                        />

                        <Route
                            path="/item/:id"
                            render={(props) => (
                                <Item
                                    key={props.match.params.id}
                                    match={props.match}
                                    history={props.history}
                                    products={this.state.products}
                                    notAvailables={this.state.notAvailables}
                                    onAddToCart={this.handleAddToCart}
                                    removeFromCart={this.handleRemoveFromCart}
                                    windowWidth={this.state.windowWidth}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/cart"
                            render={() => (
                                <Cart
                                    cart={this.state.cart}
                                    removeFromCart={this.handleRemoveFromCart}
                                    emptyCart={this.handleEmptyCart}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/checkout"
                            render={() => (
                                <Checkout
                                    cart={this.state.cart}
                                    order={this.state.order}
                                    onCaptureCheckout={
                                        this.handleCaptureCheckout
                                    }
                                    error={this.state.errorMessage}
                                />
                            )}
                        />

                        <Route
                            exact
                            path="/example-doc"
                            render={() => <DocExample />}
                        />
                        <Route exact path="/FAQ" render={() => <FAQ />} />
                        <Route
                            exact
                            path="/cookie-policy"
                            render={() => <PrivacyAndCookiePolicy />}
                        />
                        <Route
                            exact
                            path="/regolamento"
                            render={() => <Regolamento />}
                        />
                        <Route
                            exact
                            path="/terms-conditions"
                            render={() => <TermsAndConditions />}
                        />
                    </div>
                    <Footer windowWidth={this.state.windowWidth} />
                </div>
            </BrowserRouter>
        );
    }
}

function mapStateToProps(state) {
    return { state };
} // ?

export default connect(mapStateToProps)(App); // ? redux
