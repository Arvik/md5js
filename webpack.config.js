const path = require("path");
const MinifyPlugin = require("babel-minify-webpack-plugin");
minifyOpts = {};
pluginOpts = {};
module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.min.js"
  },
  plugins: [new MinifyPlugin(minifyOpts, pluginOpts)]
};
