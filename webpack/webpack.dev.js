const { resolve } = require('path');

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// const devServer = require('./webpack.server');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  // devServer: devServer
})