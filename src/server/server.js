const express = require("express");
const path = require("path"); // mi serve?

const PORT = process.env.PORT || 3001;

const app = express();
const server = require("http").Server(app); // cosa fa?

const compression = require("compression"); // cosa fa?
const sesContactUs = require("./ses-contact-us");

/////*****MIDDLEWARES*****/////
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public"))); // mi serve?
app.use(express.urlencoded({ extended: false })); // cosa fa?
app.use(express.json()); // cosa fa?
// app.use((req, res) => {
//     res.status(404).redirect("/404");
// });

/////*****REQUESTS*****/////
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "assets", "index.html"));
});

app.post("/contact", (req, res) => {
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
app.get("/test", (req, res) => {
    console.log("GET req to route /test");
    res.json({ message: "Hello from server test!" });
});

server.listen(PORT, () => {
    console.log(`I'm listening on port ${PORT}`);
});
