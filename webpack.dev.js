const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const serverConfig = require("./webpack.server.js");
const Dotenv = require("dotenv-webpack");

const mode = "development";

const browserConfig = merge(common, {
    mode: mode,

    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        static: {
            directory: "./dist",
        }, //content base is deprecated in v4 of webpack-dev-server, use static instead
        //da quando l'ho cambiato hot e liveReload si sono attivati in automatico, li disattivo 🧨 [aggiornare note]
        proxy: {
            "/": {
                target: "http://localhost:3001",
            },
        }, // disattivare proxy se si vuole usare url bar con npm start
        port: "3000",
        hot: false,
        liveReload: false,
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [new Dotenv({ systemvars: true })], //spostare in common quando si usa App local
});

module.exports = [browserConfig, serverConfig({ mode: mode })];
