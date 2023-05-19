const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require("webpack").container;
// const { FederatedTypesPlugin } = require('@module-federation/typescript')
const { dependencies } = require("./package.json");

const federationConfig = {
    name: 'application',
    // 另外一个应用html中引入的模块联邦入口文件
    filename: 'remoteEntry.js',
    // 这里是选择关联其他应用的组件
    remotes: {
        // 'appMenus':'appMenus',
        // 'appMenus':"appMenus@https://shiqiwang0.github.io/mf-example/appMenus/dist/remoteEntry.js",
        'appMenus':'appMenus@http://localhost:8080/remoteEntry.js',
    },
    // react react-dom会独立分包加载
       shared: {
          ...dependencies,
          react: {
            singleton: true,
            requiredVersion: dependencies["react"],
          },
          "react-dom": {
            singleton: true,
            requiredVersion: dependencies["react-dom"],
          },
        }
    // shared: ['react', 'react-dom'], 这样会error
}

module.exports = {
    entry: "./src/index.tsx",
    mode: "development",
    module: {
        rules: [
            {
                test: /\.(js|ts)x?$/,
                exclude: /(node_modules|bower_components)/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: 'svg-url-loader',
                        options: {
                            limit: 10000,
                        },
                    },
                ],
            },
        ]
    },
    resolve: { extensions: ["*", ".js", ".jsx", ".tsx", ".ts"] },
    output: {
        path: path.resolve(__dirname, "dist/"),
        // publicPath: "/dist/",
        filename: "bundle.js"
    },
    devServer: {
        port: 3000,
        hot: true,
        static: {
            directory: path.join(__dirname, 'public/'),
        },
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "public", "index.html"),
            favicon: "./public/favicon.ico",
            filename: "index.html",
            manifest: "./public/manifest.json",
            appleTouchIcon: './public/logo192.png'
        }),
        new ModuleFederationPlugin({ ...federationConfig }),
        // new FederatedTypesPlugin({federationConfig}),
    ],
    performance: { hints: false },
    externals: {
        React: 'react'
    },
};
