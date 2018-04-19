const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: ['babel-polyfill', './client/index.js'],
    output: {
        path: '/',
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {test: /\.(js)$/, use: 'babel-loader', exclude: /node_modules/},
            {
                test: /\.css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                            localIdentName: '[hash:base64:5]__[local]'
                        }
                    }
                ]
            },
            {test: /\.(png|jpg)$/, loader: 'url-loader?linit=8192'}
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: 'client/index.html',
            inject: false
        })
    ],
    mode: 'development'
}