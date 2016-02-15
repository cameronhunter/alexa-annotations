import config from './webpack.base.config.babel.js';

export default {
  ...config,
  entry: {
    "example/echo": './example/echo/index.js',
    "example/helloWorld": './example/helloWorld/index.js',
    "example/historyBuff": './example/historyBuff/index.js',
    "example/minecraftHelper": './example/minecraftHelper/index.js'
  }
};
