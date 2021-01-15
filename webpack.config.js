const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  target: "web",
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css",
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      publicPath: "",
    }),
    new CleanWebpackPlugin(),
  ],
  entry: {
    app: ["./src/main.js", "./src/scss/app.scss"],
  },
  output: {
    filename: "[name].js",
    path: resolve(__dirname, "dist"),
    publicPath: "",
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
        options: {},
      },
      {
        test: /\.(scss|sass)$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "resolve-url-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "assets",
            publicPath: "./assets",
          },
        },
      },
    ],
  },
  devServer: {
    port: 9001,
    publicPath: "",
    contentBase: "./src/index.html",
    watchContentBase: true,
    watchOptions: {
      ignored: /node_modules/,
    },
  },
};
