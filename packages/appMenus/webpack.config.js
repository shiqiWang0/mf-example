const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 引入moduleFederation
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
// const { dependencies } = require("./package.json");
module.exports = {
  mode: 'development',
  entry: './index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
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
    extensions: ["*", ".js", ".jsx",".tsx",".ts"],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'appMenus',
      library: { type: 'var', name: 'appMenus' },
      filename: 'remoteEntry.js',
      // 当前组件需要暴露出去的组件
      exposes: {
        './AppMenus': './src/App',
      },
      // 关联需要引入的其他应用
      remotes: {
        'application': 'application',
      },
    //   shared: {
    //     ...dependencies,
    //     react: {
    //       singleton: true,
    //       requiredVersion: dependencies["react"],
    //     },
    //     "react-dom": {
    //       singleton: true,
    //       requiredVersion: dependencies["react-dom"],
    //     },
    //   },
    //   // shared: ['react', 'react-dom'],
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  devServer: {
    hot: true
  }
};
