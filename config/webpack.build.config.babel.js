import webpack from 'webpack';
import config from './webpack.base.config.babel.js';

export default {
  ...config,
  entry: {
    'alexa-lambda-skill/index': './src/index.js',
    'alexa-lambda-skill/index.min': './src/index.js'
  },
  plugins: [
    ...config.plugins,
    new webpack.SourceMapDevToolPlugin({
      test: /index\.js$/
    }),
    new webpack.optimize.UglifyJsPlugin({
      test: /index\.min\.js$/
    })
  ]
};
