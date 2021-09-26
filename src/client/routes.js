import loadable from "@loadable/component";
const Home = loadable(() => import("./components/Home/Home"));
const About = loadable(() => import("./components/About/About"));
const Contact = loadable(() => import("./components/Contact/Contact"));
const Shop = loadable(() => import("./components/Shop/Shop"));
import Item from "./components/Shop/Item/Item";
// const Item = loadable(() => import("./components/Shop/Item/Item"));
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

/*
import FAQ from "./components/Documents/FAQ/FAQ";
import PrivacyAndCookiePolicy from "./components/Documents/PrivacyAndCookiePolicy";
import Regolamento from "./components/Documents/Regolamento";
import TermsAndConditions from "./components/Documents/TermsAndConditions";
*/

//quali vanno importati con loadable? tutti credo

const routes = [
    {
        path: "/",
        exact: true,
        component: () => <Home fallback={<div className="loader" />} />,
    },
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
    // {
    //     path: "/404",
    //     exact: true,
    //     component: NotFound,
    // },
];

export default routes;
