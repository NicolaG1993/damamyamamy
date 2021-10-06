require("dotenv").config();
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = {
    reactStrictMode: true,

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/,
            use: ["@svgr/webpack"],
        });
        config.plugins.push(
            new Dotenv({ path: path.join(__dirname, ".env"), systemvars: true })
        );

        return config;
    },
};
