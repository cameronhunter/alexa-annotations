import config from './webpack.base.config.babel.js';

export default {
  ...config,
  entry: {
    "example/echo": './example/echo/index.js'
  }
};
