const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const { DefinePlugin } = require("webpack");

module.exports = merge(common, {
    mode: "production",
    devtool: "source-map",

    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
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
        new MiniCssExtractPlugin(),
        // new DefinePlugin({
        //     "process.env": {
        //         REACT_APP_CHEC_PUBLIC_KEY: JSON.stringify(
        //             process.env.REACT_APP_CHEC_PUBLIC_KEY
        //         ),
        //         REACT_APP_STRIPE_PUBLIC_KEY: JSON.stringify(
        //             process.env.REACT_APP_STRIPE_PUBLIC_KEY
        //         ),
        //         REACT_APP_PAYPAL_CLIENT_ID: JSON.stringify(
        //             process.env.REACT_APP_PAYPAL_CLIENT_ID
        //         ),
        //         secretCookie: JSON.stringify(process.env.secretCookie),
        //         REACT_AWS_KEY: JSON.stringify(process.env.REACT_AWS_KEY),
        //         REACT_AWS_SECRET: JSON.stringify(process.env.REACT_AWS_SECRET),
        //     },
        // }), //eliminare quando si usa App local
    ],
});
