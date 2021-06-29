const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const server = require("http").Server(app);

const sesContactUs = require("./ses-contact-us");

/////*****MIDDLEWARES*****/////
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
// app.use(express.static(path.join(__dirname, "..", "client", "dist")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/////*****REQUESTS*****/////
app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "..", "client", "index.html"));
});

server.listen(process.env.PORT || 3001, () => {
    console.log("I'm listening.");
});

/*
npm start
npm run dev
npm run dev:server
npm run dev:client

npm run test filename ??
sudo service postgresql start
killall node
*/

/*
OBBIETTIVI BACK END:

disinistallare @chec/commerce.js e fare tutta la parte backend da solo
*/
