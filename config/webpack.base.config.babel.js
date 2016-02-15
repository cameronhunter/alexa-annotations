import webpack from 'webpack';

export default {
  target: 'node',
  output: {
    libraryTarget: 'commonjs2',
    filename: '[name].js',
    path: './build'
  },
  module: {
    loaders: [
      { test: /\.json$/, loader: 'json-loader' },
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      'fetch': 'isomorphic-fetch',
      'Promise': 'bluebird',
      'Object.values': 'object-values'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true)
  ]
};
