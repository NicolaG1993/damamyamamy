const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 3001;

const app = express();
const server = require("http").Server(app); // cosa fa?
const { renderToString } = require("react-dom/server");

const compression = require("compression"); // cosa fa?
const { default: App } = require("../client/App");
const { default: store } = require("../client/redux/store");
const { Provider } = require("react-redux");
const { BrowserRouter, StaticRouter } = require("react-router-dom");
const { default: ScrollToTop } = require("../client/utils/scrollToTop");
const { default: rootReducer } = require("../client/redux/rootReducer");
const { composeWithDevTools } = require("redux-devtools-extension");
const { createStore, applyMiddleware } = require("redux");
const { default: thunk } = require("redux-thunk");

// const sesContactUs = require("./ses-contact-us");

/////*****MIDDLEWARES*****/////
app.use(compression());

app.use(express.static(path.resolve(__dirname, "../dist"))); // Have Node serve the files for our built React app
// app.use(express.static(path.resolve(__dirname, "../../dist"))); // per usare local

app.use(express.urlencoded({ extended: false })); // cosa fa?
app.use(express.json()); // cosa fa?

/////*****REQUESTS*****/////

//API get request before serving React
// Handle GET requests to /api route
app.get("/api", (req, res) => {
    res.json({ message: "Hello from server!" });
});

// app.get("*", function (req, res) {
//     res.sendFile(path.join(__dirname, "..", "client", "assets", "index.html"));
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
app.get("/api/test", (req, res) => {
    console.log("GET req to route /test");
    res.json({ message: "Hello from server test!" });
});

// All other GET requests not handled before will return our React app
//Serving React

// app.get("*", (req, res) => {
//     console.log("GET req to route * ✌", req._parsedUrl.path);
//     const indexFile = path.resolve(__dirname, "../dist", "index.html"); // per prod e deploy
//     // const indexFile = path.resolve(__dirname, "../../dist", "index.html"); // per usare local
//     res.sendFile(indexFile);
// });

// app.get("/", (req, res) => {
//     console.log("GET req to route / ✌", req._parsedUrl.path);
//     const indexFile = path.resolve(__dirname, "../dist", "index.html"); // per prod e deploy
//     // const indexFile = path.resolve(__dirname, "../../dist", "index.html"); // per usare local

//     fs.readFile(indexFile, "utf8", (err) => {
//         if (err) {
//             console.error("Something went wrong:", err);
//             return res.status(500).send("Oops, better luck next time!");
//         }

//         res.sendFile(indexFile);
//     });
// });

// app.get("*", (req, res) => {
//     console.log("GET req to route * ✌", req.url);
//     // res.json({ message: "Hello from server catchall!" });

//     const indexFile = path.resolve(__dirname, "../dist", "index.html"); // per prod e deploy
//     // const indexFile = path.resolve(__dirname, "../../dist", "index.html"); // per usare local

//     const context = {};
//     const html = ReactDOMServer.renderToString(
//         <Provider store={store}>
//             <StaticRouter location={req.url} context={context}>
//                 <ScrollToTop />
//                 <App />
//             </StaticRouter>
//         </Provider>
//     );

//     if (context.url) {
//         console.error("redirect 🐱‍👓", context.url);
//         // Somewhere a `<Redirect>` was rendered
//         res.redirect(301, context.url);
//         // res.sendFile(indexFile);
//     } else {
//         console.error("no redirect 🐱‍🚀");
//         // we're good, send the response
//         // res.sendFile(indexFile);

//         fs.readFile(indexFile, "utf8", (err, data) => {
//             if (err) {
//                 console.error("Something went wrong:", err);
//                 return res.status(500).send("Oops, better luck next time!");
//             }

//             return res.send(`<div id="root">${html}</div>`);
//         });
//     }
// });

// app.get("*", (req, res) => {
//     console.log("GET req to route * ✌", req._parsedUrl.path);
//     const indexFile = path.resolve(__dirname, "../dist", "index.html"); // per prod e deploy
//     // const indexFile = path.resolve(__dirname, "../../dist", "index.html"); // per usare local
//     res.sendFile(indexFile);
// });

app.get("*", (req, res) => {
    console.log("GET req to route * ✌", req.url);
    handleRender(req, res);
});

// app.use(handleRender);

function handleRender(req, res) {
    // Create a new Redux store instance
    const store = createStore(
        rootReducer,
        composeWithDevTools(applyMiddleware(thunk))
    );

    // Render the component to a string
    const context = {};
    const markup = renderToString(
        <Provider store={store}>
            <StaticRouter location={req.url} context={context}>
                <ScrollToTop />
                <App />
            </StaticRouter>
        </Provider>
    );

    // Grab the initial state from our Redux store
    const preloadedState = store.getState();

    if (context.url) {
        console.error("redirect 🐱‍👓", context.url);
        // Somewhere a `<Redirect>` was rendered
        res.redirect(301, context.url);
    } else {
        // we're good, send the response
        console.error("no redirect 🐱‍🚀", req.url);
        // Send the rendered page back to the client

        const indexFile = path.resolve(__dirname, "../dist", "index.html"); // per prod e deploy
        // const indexFile = path.resolve(__dirname, "../../dist", "index.html"); // per usare local

        fs.readFile(indexFile, "utf8", (err, data) => {
            if (err) {
                console.error("Something went wrong:", err);
                return res.status(500).send("Oops, better luck next time!");
            }

            return res.send(
                data.replace(
                    '<div id="root"></div>',
                    `<div id="root">${markup}</div>
                    <script>window.__PRELOADED_STATE__ = ${JSON.stringify(
                        preloadedState
                    ).replace(/</g, "\\u003c")}</script>`
                )
            );
        });
    }
}

// return `
// <!doctype html>
// <html>
//   <head>
//     <title>Redux Universal Example</title>
//   </head>
//   <body>
//     <div id="root">${html}</div>
//     <script>
//       window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
//           /</g,
//           "\\u003c"
//       )}
//     </script>
//     <script src="/dist/[name].[contenthash].js"></script>
//   </body>
// </html>
// `;
// }

server.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`);
});

//NB che server fa riferimento al contenuto di dist folder
