// import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.querySelector("main"));

//se cambio questo file (ad. esempio con start.js) devo andare in "webpack.config.js" e modificare: path.join(__dirname, "client", "src", "index.js")
//per usare server.js in "package.json" modificare: "start": "node server/server.js" e modificare: "main": "server/server.js",
