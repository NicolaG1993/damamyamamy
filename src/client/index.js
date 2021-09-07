// REACT
import ReactDOM from "react-dom";
import loadable from "@loadable/component";
import { BrowserRouter as Router } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import store from "./redux/store"; //Redux without SSR

// HOOKS
import ScrollToTop from "./utils/scrollToTop";

// COMPONENTS
const App = loadable(() => import("./App"));

// STYLE
import "./style.css";

// import Icon from "./assets/logo192.png";

if (process.env.NODE_ENV !== "production") {
    console.log("Looks like we are in development mode!");
    // process.env.<YOUR KEY>
}

// Redux using SSR
// import { createStore } from "redux";
// import rootReducer from "./redux/rootReducer";
// // Grab the state from a global variable injected into the server-generated HTML
// const preloadedState = window.__PRELOADED_STATE__;
// // Allow the passed state to be garbage-collected
// delete window.__PRELOADED_STATE__;
// // Create Redux store with initial state
// const store = createStore(rootReducer, preloadedState);

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <ScrollToTop />
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
