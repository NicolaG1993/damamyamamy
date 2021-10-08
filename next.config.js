// require("dotenv").config();
// const Dotenv = require("dotenv-webpack");
// const path = require("path");

module.exports = {
    reactStrictMode: true,
    images: {
        domains: ["cdn.chec.io"],
    },

    env: {
        REACT_APP_CHEC_PUBLIC_KEY: process.env.REACT_APP_CHEC_PUBLIC_KEY,
        REACT_APP_STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
        REACT_APP_PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        secretCookie: process.env.secretCookie,
        REACT_AWS_KEY: process.env.REACT_AWS_KEY,
        REACT_AWS_SECRET: process.env.REACT_AWS_SECRET,
    },

    //per deploy

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        // config.plugins.push(
        //     new Dotenv({ path: path.join(__dirname, ".env"), systemvars: true })
        // );
        //per local

        // config.plugins.push(
        //     new options.webpack.DefinePlugin({
        //         "process.env": {
        //             REACT_APP_CHEC_PUBLIC_KEY: JSON.stringify(
        //                 process.env.REACT_APP_CHEC_PUBLIC_KEY
        //             ),
        //             REACT_APP_STRIPE_PUBLIC_KEY: JSON.stringify(
        //                 process.env.REACT_APP_STRIPE_PUBLIC_KEY
        //             ),
        //             REACT_APP_PAYPAL_CLIENT_ID: JSON.stringify(
        //                 process.env.REACT_APP_PAYPAL_CLIENT_ID
        //             ),
        //             secretCookie: JSON.stringify(process.env.secretCookie),
        //             REACT_AWS_KEY: JSON.stringify(process.env.REACT_AWS_KEY),
        //             REACT_AWS_SECRET: JSON.stringify(
        //                 process.env.REACT_AWS_SECRET
        //             ),
        //         },
        //     })
        // );
        //per deploy

        return config;
    },
};
