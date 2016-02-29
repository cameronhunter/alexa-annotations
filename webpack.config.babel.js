import webpack from 'webpack';

export default {
  target: 'node',
  entry: {
    'alexa-lambda-skill/index': './src/index.js',
    'alexa-lambda-skill/index.min': './src/index.js'
  },
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
      'global.Promise': 'bluebird',
      'Promise': 'bluebird',
      'Object.entries': 'object.entries',
      'Object.values': 'object-values'
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(true),
    new webpack.SourceMapDevToolPlugin({
      test: /index\.js$/
    }),
    new webpack.optimize.UglifyJsPlugin({
      test: /index\.min\.js$/
    })
  ]
};
