var webpack = require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');

plugins = [
    new ExtractTextPlugin('../css/style.css'),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
]

var devtool = '#source-map';
var prod = process.argv.indexOf('-p') != -1;

if(prod) {
    devtool = false;
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false
        })
    )
}

module.exports = {
    entry: {
        "app": "./client/app.jsx",
        vendor: [
            'react',
            'react-dom',
            'react-redux',
            'redux',
            'redux-thunk',
            'reselect',
            'prop-types',
            'immutable',
            'redux-little-router',
            'moment',
            'moment-timezone',
            'react-bootstrap',
            'axios',
        ]
    },
    output: {
        path: path.join(__dirname, 'static/js'),
        filename: 'main.js',
        sourceMapFilename: 'main.map'
    },
    module: {
        loaders: [
            {
                test : /\.jsx?/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader!sass-loader'})
            },
            {
                test : /\.json?/,
                loader: 'json-loader'
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                loader: 'url-loader?limit=30000&name=../fonts/[name]-[hash].[ext]'
            }
        ]
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins,
    devtool,
    externals: {
        'electron': 'electron',
    }
}