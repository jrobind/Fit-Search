const config = require('./webpack.config.js');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');


config.plugins.push(
    new webpack.DefinePlugin({
        "process.env": {
            "NODE_ENV": JSON.stringify("production")
            }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new UglifyJsPlugin({
        sourceMap: false,
        uglifyOptions: {
            warnings: false,
            output: {
                comments: false,
                beautify: false,
              }
          }
      })
);

module.exports = config;