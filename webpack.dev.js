const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");

module.exports = merge(common, {
  // Set the mode to development or production
  mode: "development",
  // Control how source maps are generated
  devtool: "inline-source-map",

  // Spin up a server for quick development
  devServer: {
    port: 9000,
    historyApiFallback: true,
    open: false,
    compress: true,
  },

  plugins: [
    // Only update what has changed on hot reload
    new webpack.HotModuleReplacementPlugin(),
  ],
});
