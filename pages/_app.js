import { Provider } from "react-redux";
import Cookies from "js-cookie";
import "@/styles/globals.css";

import Layout from "@/constants/Layout/layout";

import store from "@/redux/store.js";
// import wrapper from "@/redux/store.js";

function App({ Component, pageProps }) {
    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}
// export default wrapper.useWrappedStore(App);
export default App;
