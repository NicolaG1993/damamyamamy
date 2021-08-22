import { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import { connect } from "react-redux";
import { loadData } from "./redux/actions";

import { commerce } from "./lib/commerce";

import { Header, Footer } from "./components";
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

function App(props) {
    console.log("App renders");
    const [state, setState] = useState({
        notAvailables: [],
        windowWidth: window.innerWidth,
        windowHeight: window.innerHeight,
    });
    const [cookieAlertIsActive, setCookieAlertIsActive] = useState(true);

    const fetchCart = async () => {
        try {
            props.dispatch(loadData()); //da testare 🤞 non so se questa sia la posizione corretta per caricare redux

            const cart = await commerce.cart.retrieve();
            const addedItems = cart.line_items.map((obj) => ({
                item_id: obj.id,
                product_id: obj.product_id,
            }));
            setState({ ...state, cart: cart, notAvailables: addedItems }); //da testare 🤞
        } catch (err) {
            console.log("err in app-->componentDidMount: ", err);
        }
    };

    useEffect(() => {
        console.log("mounted");
        updateWindowDimensions();
        window.addEventListener("resize", updateWindowDimensions);
        keepTheme(); // ?
        fetchCart(); //mi servono le parentesi? 🧠
        return () => {
            window.removeEventListener("resize", updateWindowDimensions);
        };
    }, []);

    const toggleCookieAlert = async () => {
        console.log("HEYYY", cookieAlertIsActive);
        setCookieAlertIsActive(!cookieAlertIsActive);
    };

    const handleAddToCart = async (productId, quantity) => {
        const item = await commerce.cart.add(productId, quantity);
        const addedItems = item.cart.line_items.map((obj) => ({
            item_id: obj.id,
            product_id: obj.product_id,
        }));

        setState({ ...state, cart: item.cart, notAvailables: addedItems });
    };
    const handleRemoveFromCart = async (productId) => {
        const item = await commerce.cart.remove(productId);
        const addedItems = item.cart.line_items.map((obj) => ({
            item_id: obj.id,
            product_id: obj.product_id,
        }));

        setState({ ...state, cart: item.cart, notAvailables: addedItems });
    };
    const handleEmptyCart = async () => {
        const item = await commerce.cart.empty();
        const addedItems = item.cart.line_items.map((obj) => ({
            item_id: obj.id,
            product_id: obj.product_id,
        }));

        setState({ ...state, cart: item.cart, notAvailables: addedItems });
    };
    const refreshCart = async () => {
        const newCart = await commerce.cart.refresh();
        setState({ ...state, cart: newCart, notAvailables: [] });
    };
    const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
        if (checkoutTokenId === "test") {
            //this is only for test
            handleEmptyCart();
        } else {
            try {
                const incomingOrder = await commerce.checkout.capture(
                    checkoutTokenId,
                    newOrder
                );
                setState({ ...state, order: incomingOrder });
                refreshCart();
            } catch (err) {
                setState({ ...state, errorMessage: err.data.error.message });
            }
        }
    };

    const updateWindowDimensions = () =>
        setState({
            ...state,
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });

    //let reduxState = props.state; // da riscrivere 🐔
    // console.log("state in app: ", state);
    // console.log("redux state in app: ", props.state);

    return (
        <BrowserRouter>
            <div className={"App"}>
                {cookieAlertIsActive && (
                    <CookiesPopUp toggleCookieAlert={toggleCookieAlert} />
                )}

                <Header cart={state.cart} windowWidth={state.windowWidth} />

                <div className={"main"}>
                    {state.error && <p>Something broke :(</p>}

                    <Route
                        exact
                        path="/"
                        render={() => (
                            <Home
                                notAvailables={state.notAvailables}
                                onAddToCart={handleAddToCart}
                                removeFromCart={handleRemoveFromCart}
                                windowWidth={state.windowWidth}
                            />
                        )}
                    />

                    <Route exact path="/about" render={() => <About />} />
                    <Route exact path="/contact" render={() => <Contact />} />
                    <Route
                        exact
                        path="/shop"
                        tag=""
                        render={(props) => (
                            <Shop
                                notAvailables={state.notAvailables}
                                onAddToCart={handleAddToCart}
                                removeFromCart={handleRemoveFromCart}
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
                                products={state.products}
                                notAvailables={state.notAvailables}
                                onAddToCart={handleAddToCart}
                                removeFromCart={handleRemoveFromCart}
                                windowWidth={state.windowWidth}
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/cart"
                        render={() => (
                            <Cart
                                cart={state.cart}
                                removeFromCart={handleRemoveFromCart}
                                emptyCart={handleEmptyCart}
                            />
                        )}
                    />

                    <Route
                        exact
                        path="/checkout"
                        render={() => (
                            <Checkout
                                cart={state.cart}
                                order={state.order}
                                onCaptureCheckout={handleCaptureCheckout}
                                error={state.errorMessage}
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
                <Footer windowWidth={state.windowWidth} />
            </div>
        </BrowserRouter>
    );
}

function mapStateToProps(state) {
    return { state };
}
export default connect(mapStateToProps)(App); // ? redux 🤞
