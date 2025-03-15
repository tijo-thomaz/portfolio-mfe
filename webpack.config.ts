import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { container } from "webpack";

const ModuleFederationPlugin = container.ModuleFederationPlugin;

const config = {
  mode: "development",
  entry: "./src/main.tsx",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "auto",
    clean: true,
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new ModuleFederationPlugin({
      name: "portfolio_mfe",
      remotes: {
        angular_timeline_mfe:
          "angular_timeline_mfe@http://localhost:4200/remoteEntry.js",
      },
      shared: {
        react: { singleton: true, strictVersion: true, eager: true },
        "react-dom": { singleton: true, strictVersion: true, eager: true },
      },
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
  },
};

export default config;
