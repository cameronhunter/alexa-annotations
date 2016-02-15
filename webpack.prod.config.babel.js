import webpack from 'webpack';

export default {
  entry: {
    "library": './src/index.js'
  },
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: './build'
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
