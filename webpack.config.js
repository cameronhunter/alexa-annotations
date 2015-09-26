var path = require("path");

module.exports = {
  entry: path.join(__dirname, "index.js"),
  output: {
    libraryTarget: "commonjs2",
    filename: "index.js",
    path: path.join(__dirname, "dist")
  }
};
