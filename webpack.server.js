const path = require("path");
const nodeExternals = require("webpack-node-externals");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { DefinePlugin } = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
    console.log("NODE_ENV: ", env.mode);

    return {
        mode: env.mode, //usiamo funzione per passare mode come arg e farlo cosí dinamico
        entry: "./src/server/server.js",
        target: "node",
        externals: [nodeExternals()],
        output: {
            path: path.resolve(__dirname, "dist"),
            // clean: true,
            filename: "server.js",
        },

        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            cacheDirectory: true,
                        },
                    },
                },
                {
                    test: /\.css$/i,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader",
                        "postcss-loader",
                    ],
                },

                // in teoria le altre rules non dovrebbero servirmi, ma senza da errore in build
                {
                    test: /\.(png|jpg|jpeg|gif)$/i,
                    type: "asset/resource",
                },
                {
                    test: /\.svg$/,
                    use: ["@svgr/webpack"],
                },
                // {
                //     test: /\.ico$/,
                //     loader: "file-loader",
                // },

                // { test: /\.json$/, exclude: /(node_modules)/, use: "json-loader" },
            ],
        },

        // testare se system var vanno fatte cosí o come in webpack.prod.js
        plugins: [
            new MiniCssExtractPlugin(),
            new Dotenv({ systemvars: true }),
            new DefinePlugin({
                __isBrowser__: "false",
            }),
        ],
    };
};
