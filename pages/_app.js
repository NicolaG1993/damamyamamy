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
// CUSTOM HOOKS
// import { keepTheme } from "../shared/utils/themes";

function MyApp({ Component, pageProps }) {
    // useEffect(() => {
    //     keepTheme();
    // }, []);

    return (
        <Provider store={store}>
            <Layout>
                <Component {...pageProps} />
            </Layout>
        </Provider>
    );
}

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
// export default withRedux(createStore)(MyApp);
