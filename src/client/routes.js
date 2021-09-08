import loadable from "@loadable/component";
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

//quali di questi ha bisogno di initialData e quali no?

// cart in teoria devo averlo a prescindere, quindi tutto commerce.js immagino

// redux state viene passato per intero insieme ai reducer
// filter e pageNav non mi servono da server ma solo da client
// loadData e loadCart invece serve da server

//per item invece?

const routes = [
    {
        path: "/",
        exact: true,
        component: Home,
    },
    {
        path: "/about",
        component: About,
    },
    {
        path: "/shop",
        component: (props) => <Shop research={props.location.tag} />,
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
    // {
    //     path: "/404",
    //     exact: true,
    //     component: NotFound,
    // },
];

export default routes;
