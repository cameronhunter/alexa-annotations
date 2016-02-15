var webpack = require('webpack');

module.exports = {
  entry: './test/my-skill.js',
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'my-skill.js',
    path: './build/test'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  }
};
