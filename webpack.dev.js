const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

const Dotenv = require("dotenv-webpack");
module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        static: {
            directory: "./public",
        }, //content base is deprecated in v4 of webpack-dev-server, use static instead
        proxy: {
            "/": {
                target: "http://localhost:3001",
            },
        },
        port: "3000",
    },

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ],
    },
    plugins: [new Dotenv({ systemvars: true })],
});