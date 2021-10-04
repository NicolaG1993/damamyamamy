// REACT
import loadable from "@loadable/component";
import { useState, useEffect, useRef } from "react";
import { Switch, Route, Link, Redirect } from "react-router-dom";

// const fetchState = (state) => state;

// COMPONENTS
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Overlay from "./components/Overlay/Overlay";
import NotFound from "./components/404/404";

const CookiesPopUp = loadable(() =>
    import("./components/CookiesPopUp/CookiesPopUp")
);

// CUSTOM HOOKS
import { keepTheme } from "./utils/themes";
import routes from "./routes";
import { fetchCart } from "./redux/LoadCart/loadCart.actions";
import { useDispatch } from "react-redux";

// APP
export default function App() {
    // console.log("data changed:", data);
    // let state = useSelector(fetchState, shallowEqual); // only for development //crashes Shop
    // console.log("🍟REDUX store: ", state);

    const dispatch = useDispatch();
    useEffect(() => {
        keepTheme();
        dispatch(fetchCart());
    }, []);

    return (
        <div className="App">
            <Header />
            <Switch>
                {routes.map((route) => (
                    <RouteWithSubRoutes key={route.path} {...route} />
                ))}
                {/* mappiamo l'array creando una Route per ogni route che abbiamo dichiarato, la passiamo come prop: vedi prossima fn */}
                {/* <Redirect to="/404" /> */}
                <Route path="*">
                    <NotFound />
                </Route>
            </Switch>
            <Footer />
            <Overlay />
            <CookiesPopUp />
        </div>
    );
}

// SINGLE ROUTE COMPONENT
function RouteWithSubRoutes(route) {
    // console.log("route", route);
    return (
        <Route
            path={route.path}
            exact={route.exact}
            render={(props) => (
                <route.component
                    fetchInitialData={route.fetchInitialData}
                    {...props}
                    routes={route.routes}
                />
            )}
        />
    );
}

/*

sul primo render di App abbiamo un secondo senza css, come coprirlo?

axios? mi serve per fare richieste a server?

integrazione SSR con AWS
*/
