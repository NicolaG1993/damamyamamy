const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const HtmlWebpackPartialsPlugin = require("html-webpack-partials-plugin");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: {
        index: [
            "@babel/polyfill",
            "react-app-polyfill/ie11",
            "react-app-polyfill/stable",
            "./src/client/index.js",
        ],
    },

    output: {
        filename: "[name].[contenthash].js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
        publicPath: "/",
        chunkFilename: "[name].bundle.js",
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        cacheDirectory: true,
                    },
                },
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
            },
            {
                test: /\.ico$/,
                loader: "file-loader",
            },
            // { test: /\.json$/, exclude: /(node_modules)/, use: "json-loader" },
        ],
    },

    optimization: {
        moduleIds: "deterministic",
        runtimeChunk: "single",
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendors",
                    chunks: "all",
                },
            },
        },
    },

    plugins: [
        new HtmlWebpackPlugin({
            title: "Da Mamy a Mamy",
            favicon: "./src/client/assets/favicon.ico",
            template: "src/client/assets/index.html",
            meta: {
                viewport: "width=device-width, initial-scale=1.0",
                description: "Articoli usati per bambini da 0 a 10 anni",
                keywords:
                    "Articoli, Usato, Bambini, Infanzia, Cavaion, Affi, Verona, Negozio, Compravendita, Neonati",
                author: "Nicola Gaioni",
                "theme-color": "#000000",
            },
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: "src/client/assets",
                    globOptions: {
                        ignore: [
                            // Ignore all `txt` files
                            "**/*.html",
                            // Ignore all files in all subdirectories
                            "**/subdir/**",
                        ],
                    },
                },
            ],
        }),
        new WebpackManifestPlugin({
            fileName: "asset-manifest.json",
            // fileName: "./src/client/assets/manifest.json",
        }),
        new HtmlWebpackPartialsPlugin({
            path: "./src/client/partials/root.html",
        }),
        new Dotenv({ systemvars: true }),
    ],
};
