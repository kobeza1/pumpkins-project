const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        historyApiFallback: true,
        // static: {
        //     directory: path.resolve(__dirname, "dist"),
        // },
        hot: true,
        open: true,
        port: 8888,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "ts-loader",
                    },
                ],
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    {
                        loader: "css-loader",
                        options: {
                            importLoaders: 1,
                            modules: true,
                        },
                    },
                ],
                include: /\.module\.css$/,
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                exclude: /\.module\.css$/,
            },
            // {
            //     test: /\.module.css$/,
            //     use: [
            //         {
            //             loader: "css-loader",
            //             options: {
            //                 esModule: true, // Говорим о том, что хотим использовать ES Modules
            //                 modules: {
            //                     namedExport: true, // Указываем, что предпочитаем именованый экспорт дефолтному
            //                 },
            //             },
            //         },
            //     ],
            // },
            // {
            //     test: /\.css$/,
            //     use: ["style-loader", "css-loader"],
            // },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js", ".jsx"],
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public/index.html"),
        }),
    ],
};
