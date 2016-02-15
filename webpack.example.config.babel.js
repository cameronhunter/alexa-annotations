import config from './webpack.prod.config.babel.js';

export default {
  ...config,
  entry: {
    "example/echo": './example/echo/index.js'
  }
};
