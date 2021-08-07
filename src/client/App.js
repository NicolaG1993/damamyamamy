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
const fetchData = (state) => state.loadData;

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

    const dispatch = useDispatch();
    useEffect(() => {
        keepTheme();
        dispatch(loadData());
        dispatch(fetchCategories());
        dispatch(fetchSpecificCategories());
        // dispatch(fetchHighestValue());
    }, []);

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
