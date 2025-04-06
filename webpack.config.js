const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/",
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      { test: /\.(ts|tsx)$/, use: "ts-loader", exclude: /node_modules/ },
      { test: /\.css$/, use: ["style-loader", "css-loader"] },
      { test: /\.(png|jpg|gif|svg)$/, use: ["file-loader"] },
    ],
  },
  resolve: { extensions: [".ts", ".tsx", ".js"] },
  plugins: [new HtmlWebpackPlugin({ template: "./public/index.html" })],
};
