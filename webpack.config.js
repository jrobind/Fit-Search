const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

var config = {
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
            template: 'client/index.html'
        })
    ],
    mode: 'development'
}

if(process.env.NODE_ENV === 'production') {
    config.mode = 'production';
    
    config.plugins.push(
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    )
}

module.exports = conifg;