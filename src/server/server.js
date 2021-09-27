import express from "express";
// import path from "path";
import cors from "cors";
// import fs from "fs";

import ReactDOM from "react-dom/server";
import { StaticRouter, matchPath } from "react-router-dom";
import serialize from "serialize-javascript";

import compression from "compression"; // cosa fa?

import App from "../client/App";
import routes from "../client/routes";

import ScrollToTop from "../client/utils/scrollToTop";
import rootReducer from "../client/redux/rootReducer";
import { createStore } from "redux";

// import sesContactUs from "./ses-contact-us";

const app = express();
const server = require("http").Server(app); // cosa fa?

// import store from "../client/redux/store";
import { Provider } from "react-redux";

/////*****MIDDLEWARES*****/////
app.use(cors());
app.use(compression());

app.use(express.static("dist")); // Have Node serve the files for our built React app

app.use(express.urlencoded({ extended: false })); // cosa fa?
app.use(express.json()); // cosa fa?

/////*****REQUESTS*****/////

// app.get("/api", (req, res) => {
//     res.json({ message: "Hello from server!" });
// });

// app.post("/api/contact", (req, res) => {
//     console.log("POST req to route /contact", req.body);
//     const fname = req.body.contactname;
//     const lname = req.body.contactlast;
//     const email = req.body.email;
//     const phone = req.body.phone || "";
//     const message = req.body.message;

//     sesContactUs
//         .sendEmail(fname, lname, email, phone, message)
//         .then(res.json({ emailSended: true }))
//         .catch((err) => {
//             console.log("ERR in sesContactUs: ", err);
//             res.json({ error: true });
//         });
// });

// app.get("/api/test", (req, res) => {
//     console.log("GET req to route /test");
//     res.json({ message: "Hello from server test!" });
// });

// All other GET requests not handled before will return our React app
// Serving React
app.get("*", (req, res, next) => {
    console.log("GET req to route * ✌", req.url);
    handleRender(req, res, next);
});

function handleRender(req, res, next) {
    const htmlTemplate = `<!DOCTYPE html>
<html lang="en-US">
    <head>
        <meta charset="UTF-8"/>
        <title>Da Mamy a Mamy</title>
        <link rel="manifest" href="/manifest.json"/>
        <link rel="icon" href="/favicon.ico">
        <link rel="apple-touch-icon" sizes="192x192" href="/logo192.png"/>
        <link rel="apple-touch-icon" sizes="512x512" href="/logo512.png"/>
        <!-- questo script serve per abilitare css var ed altre funzionalitá in IE e altri browsers -->
        <script src="https://cdn.jsdelivr.net/gh/nuxodin/ie11CustomProperties@4.1.0/ie11CustomProperties.min.js"></script>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Articoli usati per bambini da 0 a 10 anni">
        <meta name="keywords" content="KeyWord1, Keyword2, KeyWord3">
        <meta name="author" content="Nicola Gaioni">
        <meta name="theme-color" content="#000000">
        <script defer src="/bundle.js"></script>
        <link href="/main.css" rel="stylesheet">
    </head>
    <body>
        <div id="root"></div>
    </body>
</html>`;

    //con matchPath cerca la route che corrisponde a path (se esistono, entrambi)
    const activeRoute =
        routes.find((route) => matchPath(req.url, route.path)) || {};
    console.log("activeRoute: ", activeRoute);

    //Now we have a promise which is going to resolve with the data or nothing.
    //instead of always fetching data, we’re only fetching if the route that is being rendered has a fetchInitialData property.
    const promise = activeRoute.fetchInitialData
        ? activeRoute.fetchInitialData(req.path)
        : Promise.resolve();

    // lanciamo promise
    promise
        .then((data) => {
            console.log("data", data);

            // Create a new Redux store instance
            const store = createStore(rootReducer);

            // quello che passiamo come context sará disponibile nei vari components di client
            const context = { data };
            // console.log("context", context);

            const markup = ReactDOM.renderToString(
                <Provider store={store}>
                    <StaticRouter location={req.url} context={context}>
                        <ScrollToTop />
                        <App />
                    </StaticRouter>
                </Provider>
            );

            // Grab the initial state from our Redux store
            const preloadedState = store.getState();

            const endResponse = htmlTemplate.replace(
                '<div id="root"></div>',
                `<div id="root">${markup}</div>
                        <script>window.__INITIAL_DATA__ = ${serialize(
                            data
                        )}</script>
                        <script>window.__PRELOADED_STATE__ = ${serialize(
                            preloadedState
                        ).replace(/</g, "\\u003c")}</script>`
            );

            // serialize sostituisce JSON.stringify, non so bene xk?

            //questo if non so se serve veramente
            if (context.url) {
                console.error("redirect 🐱‍👓", context.url);
                // Somewhere a `<Redirect>` was rendered
                res.redirect(301, context.url);
            } else {
                // we're good, send the response
                console.error("no redirect 🐲", req.url);
                // Send the rendered page back to the client
                res.send(endResponse);
                // res.send(htmlTemplate);
            }
        })
        .catch((err) => {
            console.log("ERR in promise: ", err);
            // res.json({ error: true });
            next; // perché next?
        }); // .catch(next);
}

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`);
});

//NB che server fa riferimento al contenuto di dist folder
