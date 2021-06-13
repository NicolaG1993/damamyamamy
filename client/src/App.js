// import axios from "./axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

import { connect } from "react-redux";
import { loadData } from "./redux/actions";

import { commerce } from "./lib/commerce";

import { Header, Nav, Footer } from "./components";
import { Home, About, Contact, Shop, Item, Cart, Checkout } from "./components";
import DocExample from "./components/docs/DocExample";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsActive: false,
            notAvailables: [],
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
        this.handleEmptyCart = this.handleEmptyCart.bind(this);
        this.handleCaptureCheckout = this.handleCaptureCheckout.bind(this);
        this.refreshCart = this.refreshCart.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }

    async componentDidMount() {
        // console.log("App component did mount");
        this.updateWindowDimensions();
        window.addEventListener("resize", this.updateWindowDimensions);

        try {
            this.props.dispatch(loadData());

            const cart = await commerce.cart.retrieve();
            const addedItems = cart.line_items.map((obj) => ({
                item_id: obj.id,
                product_id: obj.product_id,
            })); //scriverla una sola volta con componentDidUpdate ?
            // console.log("products: ", data);
            // console.log("cart: ", cart);
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
        // console.log("checkoutTokenId: ", checkoutTokenId);
        // console.log("newOrder: ", newOrder);
        try {
            const incomingOrder = await commerce.checkout.capture(
                checkoutTokenId,
                newOrder
            );
            // console.log("order: ", incomingOrder);
            this.setState({
                order: incomingOrder,
            });
            this.refreshCart();
        } catch (err) {
            // console.log("error in handleCaptureCheckout: ", err);
            this.setState({ errorMessage: err.data.error.message });
        }
    }

    updateWindowDimensions() {
        this.setState({
            windowWidth: window.innerWidth,
            windowHeight: window.innerHeight,
        });
    }

    render() {
        // console.log("this.state in app: ", this.state);
        // console.log("redux state in app: ", this.props.state);
        let reduxState = this.props.state;

        return (
            <BrowserRouter>
                <div className={"App"}>
                    <Header
                        navIsActive={this.state.navIsActive}
                        closeNav={this.closeNav}
                        toggleNav={this.toggleNav}
                        cart={this.state.cart}
                    />
                    <Nav
                        navIsActive={this.state.navIsActive}
                        toggleNav={this.toggleNav}
                    />

                    <div className={"main"}>
                        {this.state.error && <p>Something broke :(</p>}

                        <Route
                            exact
                            path="/"
                            render={() => (
                                <Home
                                    products={reduxState.allStore}
                                    cat1={reduxState.cat1}
                                    cat2={reduxState.cat2}
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

                        {/* <Route path={`/item/${id}`} render={() => <Item />} /> */}
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

/*

MIGLIORIE:
🐲 🐔
creare un header component 🐲
creare un footer component 🐲

fare funzioni async, ma quali e come? 🐔

dovrei fare solo fn components? app incluso ed usare hooks (informarsi) 🐔
https://www.youtube.com/watch?v=377AQ0y6LPA -> per rifare con hooks la parte relative a commerce.js

dovrei usare l'eventlistener per scroll in App? 🐲

NEXT STEPS:
🐲 🐔
filtra/ricerca in shop 🐲
come fare suggested items in list comp 🐲

completare slider 🐲

styling 🐲
ritocchi finali in react ai vari components 🐔

fare "/about" 🐲
fare "/contacts" 🐲

aggiungere parallax effect 🐲
migliorare style di filterbar in Shop 🐔

si puo scrivere handleScroll dei vari parallax in App? 🐔
    come con updateWindowDimensions
é il caso di settare windowWidth windowHeight in redux state? 🐔
    visto che le passo in vari components

attivare modulo in Contact 🐲
fixare bug -> useEffect in Contact per scroll ri-rendera il form 🐲
    (usare localStorage?)
    (soluzione: React.memo per annullare il re-render di ContactForm ) 
gestione degli errori e dei messaggi (input obbligatori mancanti, errore da SES) 🐔
design delle varie view in ContactForm 🐲

form in filter-bar diventa 0 opacitá ma non é display hidden? 🐲
    (overflow is the answer) 

aggiunge funzionalitá in Item -> galleria immagini in overlay 🐔
aggiunge funzionalitá in Item -> anteprima galleria immagini 🐔

attivare slides per telefono in shortlists e slider invece di frecce 🐔

BACKEND:
🐲 🐔
creare le varie lists in psql 🐔
fare tutta parte di commerce.js (server side e react requests) 🐔
fare tutta parte di stripe (?) 🐔
corretta gestione generale degli errori, compresa di messaggi 🐔
    (sia per post requests tipo forms o inputs, sia per le varie risposte da servers o api)

*/
