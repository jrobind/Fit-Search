const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    entry: './client/index.js',
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader', exclude: /node_modules/},
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            {test: /\.(png|jpg)$/, loader: 'url-loader?linit=8192'}
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'client/index.html'
        })
    ],
    mode: 'development'
}