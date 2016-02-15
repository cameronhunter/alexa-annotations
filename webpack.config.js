var webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'index.js',
    path: './build/main'
  },
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'Promise': 'bluebird',
      'Object.values': 'object-values'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.optimize.UglifyJsPlugin()
  ]
};
