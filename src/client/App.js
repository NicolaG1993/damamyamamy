// REACT
import loadable from "@loadable/component";
import { useState, useEffect, useRef } from "react";
import { Switch, Route, Link } from "react-router-dom";

// REDUX
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
    loadData,
    fetchSpecificCategories,
    fetchCategories,
    fetchHighestValue,
} from "./redux/LoadData/loadData.actions";
import { fetchCart } from "./redux/LoadCart/loadCart.actions";
const fetchData = (state) => state.loadData;
const fetchState = (state) => state;

// COMPONENTS
const Header = loadable(() => import("./components/Header/Header"));
const Footer = loadable(() => import("./components/Footer/Footer"));
const Overlay = loadable(() => import("./components/Overlay/Overlay"));

const Home = loadable(() => import("./components/Home/Home"));
const About = loadable(() => import("./components/About/About"));
const Contact = loadable(() => import("./components/Contact/Contact"));
const Shop = loadable(() => import("./components/Shop/Shop"));
const Item = loadable(() => import("./components/Shop/Item/Item"));
const Cart = loadable(() => import("./components/Cart/Cart"));
const Checkout = loadable(() => import("./components/Checkout/Checkout"));

const FAQ = loadable(() => import("./components/Documents/FAQ/FAQ"));
const PrivacyAndCookiePolicy = loadable(() =>
    import("./components/Documents/PrivacyAndCookiePolicy")
);
const Regolamento = loadable(() =>
    import("./components/Documents/Regolamento")
);
const TermsAndConditions = loadable(() =>
    import("./components/Documents/TermsAndConditions")
);
const CookiesPopUp = loadable(() =>
    import("./components/CookiesPopUp/CookiesPopUp")
);

// CUSTOM HOOKS
import { keepTheme } from "../../client/src/utils/themes";

// APP
export default function App() {
    let data = useSelector(fetchData, shallowEqual);
    console.log("data changed:", data);
    // let state = useSelector(fetchState, shallowEqual); // only for development //crashes Shop
    // console.log("🍟REDUX store: ", state);

    const dispatch = useDispatch();

    useEffect(() => {
        keepTheme();
        dispatch(loadData());
        dispatch(fetchCategories());
        dispatch(fetchCart());
    }, []);

    useEffect(() => {
        dispatch(fetchSpecificCategories());
    }, [data.data]);

    const routes = [
        {
            path: "/",
            exact: true,
            component: () => <Home props={""} />,
        },
        {
            path: "/about",
            component: About,
        },
        {
            path: "/shop",
            component: () => <Shop />,
        },
        {
            path: "/item/:id",
            component: Item,
        },
        {
            path: "/contact",
            component: Contact,
        },
        {
            path: "/checkout",
            component: Checkout,
        },
        {
            path: "/cart",
            component: Cart,
        },
        {
            path: "/cookie-policy",
            component: PrivacyAndCookiePolicy,
        },
        {
            path: "/FAQ",
            component: FAQ,
        },
        {
            path: "/regolamento",
            component: Regolamento,
        },
        {
            path: "/terms-conditions",
            component: TermsAndConditions,
        },
    ];

    return (
        <div className="App">
            <Header fallback={<div className="loader" />} />
            <Switch>
                {routes.map((route, i) => (
                    <RouteWithSubRoutes key={i + 1} {...route} />
                ))}
                {/* mappiamo l'array creando una Route per ogni route che abbiamo dichiarato, la passiamo come prop: vedi prossima fn */}
            </Switch>
            <Footer fallback={<div className="loader" />} />
            <Overlay />
            <CookiesPopUp />
        </div>
    );
}

// SINGLE ROUTE COMPONENT
function RouteWithSubRoutes(route) {
    console.log("route", route);
    return (
        <Route
            path={route.path}
            render={(props) => (
                <route.component
                    {...props}
                    routes={route.routes}
                    fallback={<div className="loader" />}
                />
            )}
        />
    );
}

// notAvailables viene passato da App ai children (es. App->Shop->Item->CartButton)
// perché Cart state vá caricato a prescindere da quale component arriviamo prima, come da url bar link
// inoltre il suo stato deve essere costante in tutta App e i suoi children
// quindi tutti i component devono aggiornarsi di conseguenza, insieme

// const handleAddToCart = async (productId, quantity) => {
//     const item = await commerce.cart.add(productId, quantity);
//     const addedItems = item.cart.line_items.map((obj) => ({
//         item_id: obj.id,
//         product_id: obj.product_id,
//     }));

//     setState({ ...state, cart: item.cart, notAvailables: addedItems });
// };
// const handleRemoveFromCart = async (productId) => {
//     const item = await commerce.cart.remove(productId);
//     const addedItems = item.cart.line_items.map((obj) => ({
//         item_id: obj.id,
//         product_id: obj.product_id,
//     }));

//     setState({ ...state, cart: item.cart, notAvailables: addedItems });
// };

// const handleEmptyCart = async () => {
//     const item = await commerce.cart.empty();
//     const addedItems = item.cart.line_items.map((obj) => ({
//         item_id: obj.id,
//         product_id: obj.product_id,
//     }));

//     setState({ ...state, cart: item.cart, notAvailables: addedItems });
// };
// const refreshCart = async () => {
//     const newCart = await commerce.cart.refresh();
//     setState({ ...state, cart: newCart, notAvailables: [] });
// };
// const handleCaptureCheckout = async (checkoutTokenId, newOrder) => {
//     if (checkoutTokenId === "test") {
//         //this is only for test
//         handleEmptyCart();
//     } else {
//         try {
//             const incomingOrder = await commerce.checkout.capture(
//                 checkoutTokenId,
//                 newOrder
//             );
//             setState({ ...state, order: incomingOrder });
//             refreshCart();
//         } catch (err) {
//             setState({ ...state, errorMessage: err.data.error.message });
//         }
//     }
// };
