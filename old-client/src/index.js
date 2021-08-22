// import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";
import filterStore from "./redux/reducers";

import App from "./App";

const store = createStore(
    filterStore,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

let elem;
elem = (
    <Provider store={store}>
        <App />
    </Provider>
);

ReactDOM.render(elem, document.querySelector("main"));

//se cambio questo file (ad. esempio con start.js) devo andare in "webpack.config.js" e modificare: path.join(__dirname, "client", "src", "index.js")
//per usare server.js in "package.json" modificare: "start": "node server/server.js" e modificare: "main": "server/server.js",
