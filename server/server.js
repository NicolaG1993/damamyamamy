const express = require("express");
const app = express();
const compression = require("compression");
const path = require("path");
const server = require("http").Server(app);
const cookieSession = require("cookie-session");
const cryptoRandomString = require("crypto-random-string");

let cookie_sec;
if (process.env.secretCookie) {
    cookie_sec = process.env.secretCookie;
} else {
    cookie_sec = require("./secrets.json").secretCookie;
}

const cookieSessionMiddleware = cookieSession({
    secret: cookie_sec,
    maxAge: 1000 * 60 * 60 * 24 * 14,
});
const csurf = require("csurf");

const {
    requireLoggedInUser,
    requireLoggedOutUser,
    setToken,
    dealWithCookieVulnerabilities,
} = require("./middleware");
const db = require("./db");
const bc = require("./bc");
const ses = require("./ses");
const s3 = require("./s3");
const { uploader } = require("./upload");

/////*****MIDDLEWARES*****/////
app.use(compression());
app.use(express.static(path.join(__dirname, "..", "client", "public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cookieSessionMiddleware);
app.use(csurf());
app.use(setToken);
app.use(dealWithCookieVulnerabilities); // mi serve questo?

/////*****AUTH*****/////
app.post("/registration", async (req, res) => {
    console.log("req.body: ", req.body);
    const { first, last, email, password } = req.body;
    try {
        const hashedPw = await bc.hash(password);
        const results = await db.userRegistration(first, last, email, hashedPw);
        req.session.userId = results.rows[0].id;
        console.log("db.userRegistration had no issues!");
        res.json({ results });
    } catch (err) {
        console.log("err in POST /registration", err.message);
        console.log(err.code);
        if (err.message === 'relation "users" does not exist') {
            // send back an error specific response
            console.log('relation "users" does not exist');
            res.json({ error: true });
        } else if (err.code == "54301") {
            // send back an error specific response
            console.log("err.code: 54301");
            res.json({ error: true });
        }
        res.json({ error: true });
    }
});

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.checkUser(email)
        .then((results) => {
            const hashFromDB = results.rows[0].password;
            bc.compare(password, hashFromDB)
                .then((match) => {
                    if (match) {
                        req.session.userId = results.rows[0].id;
                        res.json(results);
                    } else {
                        console.log("ERR in bc.compare, infos not correct!!!");
                        res.json({ error: true });
                    }
                })
                .catch((err) => {
                    console.log("ERR in bc.compare: ", err);
                    res.json({ error: true });
                });
        })
        .catch((err) => {
            console.log("ERR in db.checkUser: ", err);
            res.json({ error: true });
        });
});

/////*****OTHER REQ*****/////

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
