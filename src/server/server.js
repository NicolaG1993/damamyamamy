const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3001;

const app = express();
const server = require("http").Server(app); // cosa fa?

const compression = require("compression"); // cosa fa?
const sesContactUs = require("./ses-contact-us");

/////*****MIDDLEWARES*****/////
app.use(compression());
app.use(express.static(path.resolve(__dirname, "../../dist"))); // Have Node serve the files for our built React app
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

app.post("/api/contact", (req, res) => {
    console.log("POST req to route /contact", req.body);
    const fname = req.body.contactname;
    const lname = req.body.contactlast;
    const email = req.body.email;
    const phone = req.body.phone || "";
    const message = req.body.message;

    sesContactUs
        .sendEmail(fname, lname, email, phone, message)
        .then(res.json({ emailSended: true }))
        .catch((err) => {
            console.log("ERR in sesContactUs: ", err);
            res.json({ error: true });
        });
});
app.get("/api/test", (req, res) => {
    console.log("GET req to route /test");
    res.json({ message: "Hello from server test!" });
});

// All other GET requests not handled before will return our React app
//Serving React
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../dist", "index.html"));
});

server.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`);
});

//NB che server fa riferimento al contenuto di dist folder
