import "../shared/styles/globals.css";
//COMPONENTS
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Layout from "../constants/layout";
// REDUX
// import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
// import { createStore } from "redux";
import store from "../redux/store";
import { createWrapper } from "next-redux-wrapper";
import { SnackbarProvider } from "notistack";

// CUSTOM HOOKS
// import { keepTheme } from "../shared/utils/themes";

const env = process.env.NODE_ENV;
let workInProgress = false;
if (env == "production") {
    workInProgress = true; // 👀
}

function MyApp({ Component, pageProps }) {
    // useEffect(() => {
    //     keepTheme();
    // }, []);
    if (workInProgress) {
        return (
            <div id="WIP">
                <div>
                    <h1>SITO IN FASE DI SVILUPPO</h1>
                    <h3>Disponibile a breve</h3>
                </div>
                <div>
                    <h4>DA MAMY A MAMY</h4>
                    <p>Vicolo Teatro, 4, 37010 Cavaion, Verona, IT</p>
                    <p>
                        <a href="tel:+393479792644">(+39) 347 9792 644</a>
                    </p>
                    <p>
                        <a href="mailto:damamyamamy@gmail.com">
                            damamyamamy@gmail.com
                        </a>
                    </p>
                </div>
            </div>
        );
    } else {
        return (
            <SnackbarProvider
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Provider store={store}>
                    <PayPalScriptProvider deferLoading={true}>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </PayPalScriptProvider>
                </Provider>
            </SnackbarProvider>
        );
    }
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
// export default withRedux(createStore)(MyApp);

/*
Layout o ColorModeButton - prevent reload 🧠

sul primo render di App abbiamo un secondo senza css, come coprirlo? 🐸?

components mancanti: CookieOverlay, Documents 🧨

axios? mi serve per fare richieste a server? 🧠

deploy (integrazione SSR) con AWS 🧨

SEO 🧨
mettere i vari <head>
fare SEO tests

implementare DB e API
testare pagamenti

*/

/*
env:

posso provare au usare desinenze NEXT_ ... invece di REACT_APP_...
forse non devo passare process env a deploy in quanto gia cé?
*/
