import loadable from "@loadable/component";

import Home from "./components/Home/Home";
import About from "./components/About/About";
import Contact from "./components/Contact/Contact";
import Item from "./components/Shop/Item/Item";

import FAQ from "./components/Documents/FAQ/FAQ";
import PrivacyAndCookiePolicy from "./components/Documents/PrivacyAndCookiePolicy";
import Regolamento from "./components/Documents/Regolamento";
import TermsAndConditions from "./components/Documents/TermsAndConditions";

const Shop = loadable(() => import("./components/Shop/Shop"));
const Cart = loadable(() => import("./components/Cart/Cart"));
const Checkout = loadable(() => import("./components/Checkout/Checkout"));

import { fetchItem } from "../server/api";

const routes = [
    {
        path: "/about",
        component: About,
    },
    {
        path: "/shop",
        component: (props) => (
            <Shop
                research={props.location.tag}
                fallback={<div className="loader" />}
            />
        ),
    },
    {
        path: "/item/:id",
        component: Item,
        fetchInitialData: (path = "") => fetchItem(path.split("/").pop()),
    }, //questo non va con loadable perché vuole data preload da SSR
    {
        path: "/contact",
        component: Contact,
    },
    {
        path: "/checkout",
        component: () => <Checkout fallback={<div className="loader" />} />,
    },
    {
        path: "/cart",
        component: () => <Cart fallback={<div className="loader" />} />,
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
    {
        path: "/",
        exact: true,
        component: Home,
    },
    // {
    //     path: "/404",
    //     exact: true,
    //     component: NotFound,
    // },
];

export default routes;
