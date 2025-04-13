const Webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const WebpackConfig = require("../webpack.dev.js");

(async () => {
  const server = new WebpackDevServer(
    WebpackConfig.devServer,
    Webpack(WebpackConfig),
  );

  try {
    await server.start();

    if (process.send) {
      process.send("ok");
    }
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
})();
