const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const serverConfig = require("./webpack.server.js");
// const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { DefinePlugin } = require("webpack");

const mode = "production";

const browserConfig = merge(common, {
    mode: mode,
    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    // MiniCssExtractPlugin.loader,
                    "style-loader",
                    "css-loader",
                    "postcss-loader",
                ],
            },
        ],
    },

    optimization: {
        minimizer: [new CssMinimizerPlugin()],
    },

    plugins: [
        // new MiniCssExtractPlugin(),
        new DefinePlugin({
            "process.env": {
                REACT_APP_CHEC_PUBLIC_KEY: JSON.stringify(
                    process.env.REACT_APP_CHEC_PUBLIC_KEY
                ),
                REACT_APP_STRIPE_PUBLIC_KEY: JSON.stringify(
                    process.env.REACT_APP_STRIPE_PUBLIC_KEY
                ),
                REACT_APP_PAYPAL_CLIENT_ID: JSON.stringify(
                    process.env.REACT_APP_PAYPAL_CLIENT_ID
                ),
                secretCookie: JSON.stringify(process.env.secretCookie),
                REACT_AWS_KEY: JSON.stringify(process.env.REACT_AWS_KEY),
                REACT_AWS_SECRET: JSON.stringify(process.env.REACT_AWS_SECRET),
            },
        }), //eliminare quando si usa App local
    ],
});

module.exports = [browserConfig, serverConfig({ mode: mode })];
