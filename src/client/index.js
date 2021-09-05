// REACT
import ReactDOM from "react-dom";
import loadable from "@loadable/component";
import { BrowserRouter as Router } from "react-router-dom";

// REDUX
import { Provider } from "react-redux";
import store from "./redux/store";

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

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <ScrollToTop />
            <App />
        </Router>
    </Provider>,
    document.getElementById("root")
);
