import axios from "./axios";
import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { commerce } from "./lib/commerce";

import { Header, Nav, Footer } from "./components";
import { Home, About, Shop, Cart } from "./components";

export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            navIsActive: false,
        };

        this.toggleNav = this.toggleNav.bind(this);
        this.closeNav = this.closeNav.bind(this);
        this.handleAddToCart = this.handleAddToCart.bind(this);
        this.handleRemoveFromCart = this.handleRemoveFromCart.bind(this);
        this.handleEmptyCart = this.handleEmptyCart.bind(this);
    }

    async componentDidMount() {
        console.log("App component did mount");

        try {
            const { data } = await commerce.products.list();
            const cart = await commerce.cart.retrieve();
            console.log("products: ", data);
            console.log("cart: ", cart);

            this.setState({
                products: data,
                cart: cart,
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

    async handleAddToCart(productId, quantity) {
        const item = await commerce.cart.add(productId, quantity);

        this.setState({
            cart: item.cart,
        });
    }
    async handleRemoveFromCart(productId) {
        const item = await commerce.cart.remove(productId);

        this.setState({
            cart: item.cart,
        });
    }
    async handleEmptyCart() {
        const item = await commerce.cart.empty();

        this.setState({
            cart: item.cart,
        });
    }

    render() {
        console.log("this.state in app: ", this.state);

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

                        <Route exact path="/" render={() => <Home />} />

                        <Route exact path="/about" render={() => <About />} />
                        <Route
                            exact
                            path="/shop"
                            render={() => (
                                <Shop
                                    products={this.state.products}
                                    onAddToCart={this.handleAddToCart}
                                    removeFromCart={this.handleRemoveFromCart}
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
https://www.youtube.com/watch?v=377AQ0y6LPA -> per rifare con hooks la parte relative a commerce.js


*/
