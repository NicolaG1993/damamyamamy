// require("dotenv").config();
// const Dotenv = require("dotenv-webpack");
// const path = require("path");
//per local

// const withImages = require("next-images");

module.exports = {
    i18n: {
        localeDetection: false,
        locales: ["it"],
        defaultLocale: "it",
    },

    reactStrictMode: true,

    disableStaticImages: true,
    images: {
        domains: ["cdn.chec.io", "dmam-items.s3.eu-south-1.amazonaws.com"],
    },

    env: {
        REACT_APP_STRIPE_PUBLIC_KEY: process.env.REACT_APP_STRIPE_PUBLIC_KEY,
        REACT_APP_STRIPE_SECRET_KEY: process.env.REACT_APP_STRIPE_SECRET_KEY,
        REACT_APP_PAYPAL_CLIENT_ID: process.env.REACT_APP_PAYPAL_CLIENT_ID,
        REACT_AWS_KEY: process.env.REACT_AWS_KEY,
        REACT_AWS_SECRET: process.env.REACT_AWS_SECRET,
        secretCookie: process.env.secretCookie,
        ADMIN_SECRET: process.env.ADMIN_SECRET,
        DATABASE_URL: process.env.DATABASE_URL,
    },

    externals: {
        _http_common: "commonjs2 _http_common",
    },

    //per deploy

    webpack(config, { webpack }) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        // config.plugins.push(
        //     new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ })
        // );

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
