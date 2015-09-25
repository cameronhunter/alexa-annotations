var path = require("path");

module.exports = {
  entry: path.join(__dirname, "index.js"),
  output: {
    libraryTarget: "commonjs",
    filename: "index.js",
    path: path.join(__dirname, "dist")
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          stage: 1
        }
      }
    ]
  }
}
