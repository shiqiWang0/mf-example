const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入moduleFederation
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// const {FederatedTypesPlugin} = require('@module-federation/typescript') // 自动生成 typeScript 但有问题
const { dependencies } = require("./package.json");

const federationConfig = {
  name: 'appMenus',
  filename: 'remoteEntry.js',
  // 当前组件需要暴露出去的组件
  exposes: {
    './AppMenus': './src/App',
  },
  shared: { // 统一 react 等版本，避免重复加载
    ...dependencies,
    react: {
      singleton: true,
      requiredVersion: dependencies["react"],
    },
    "react-dom": {
      singleton: true,
      requiredVersion: dependencies["react-dom"],
    },
  },
}
module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel-loader",
      },
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".tsx", ".ts"],
  },

  plugins: [
    new ModuleFederationPlugin({ ...federationConfig }),
    // new FederatedTypesPlugin({federationConfig}), // 引入MF外部组件的typeScript

    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
};
