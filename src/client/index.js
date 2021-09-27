// REACT
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import rootReducer from "./redux/rootReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

// HOOKS
import ScrollToTop from "./utils/scrollToTop";

// COMPONENTS
// const App = loadable(() => import("./App")); //forse importare normalmente?
import App from "./App";

// STYLE
import "./style.css";

// import Icon from "./assets/logo192.png";

if (process.env.NODE_ENV !== "production") {
    console.log("Looks like we are in development mode!");
    // process.env.<YOUR KEY>
}

// Redux using SSR
// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__;
// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__;

// Create Redux store with initial state
const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.hydrate(
    <Provider store={store}>
        <Router>
            <ScrollToTop />
            <App data={window.__INITIAL_DATA__} />
        </Router>
    </Provider>,
    document.getElementById("root")
);
//credo non mi serva piu data come prop in App, provare a eliminare ?
//dovrebbe essere giá disponibile da window
