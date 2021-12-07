import { useEffect } from "react";
import "../shared/styles/globals.css";
//COMPONENTS
import Layout from "../constants/layout";
// REDUX
import withRedux from "next-redux-wrapper";
import { Provider } from "react-redux";
import { createStore } from "redux";
import store from "../redux/store";
import { createWrapper } from "next-redux-wrapper";
import { SnackbarProvider } from "notistack";
import Cookies from "js-cookie";
// CUSTOM HOOKS
// import { keepTheme } from "../shared/utils/themes";

function MyApp({ Component, pageProps }) {
    // useEffect(() => {
    //     keepTheme();
    // }, []);
    return (
        <SnackbarProvider
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
            <Provider store={store}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </Provider>
        </SnackbarProvider>
    );
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
