// Written in ES5 for Node v0.10.36 compatibility

var babel = require('rollup-plugin-babel');
var uglify = require('rollup-plugin-uglify');
var inject = require('rollup-plugin-inject');

var production = process.env.NODE_ENV == 'production';
var nonNull = function(array) { return array.filter(function(value) { return !!value; }); }

module.exports = {
  entry: 'src/index.js',
  dest: production ? 'build/index.min.js' : 'build/index.js',
  format: 'cjs',
  plugins: nonNull([
    babel({
      babelrc: false,
      presets: ['es2015-rollup', 'stage-1'],
      plugins: ['transform-decorators-legacy']
    }),
    inject({
      exclude: 'node_modules/**',
      Promise: 'bluebird',
      'Object.values': 'object-values'
    }),
    production ? uglify() : null
  ])
};
