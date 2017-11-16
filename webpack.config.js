const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
  entry: "./src/app.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.min.js"
  },
  devtool: 'source-map',
  plugins: [new UglifyJSPlugin({sourceMap: true})]
};
