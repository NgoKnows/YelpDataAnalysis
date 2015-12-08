var path = require('path');
var webpack = require('webpack');
var json = require('json-loader')
var ROOT_DIR = __dirname;

module.exports = {
    context: ROOT_DIR,
    devtool: 'source-map',
    entry: [
        path.resolve(ROOT_DIR, 'client', 'js', 'index.es6.js')
    ],

    resolve: {
        extensions: ['', '.js', '.jsx', '.es6.js'],
        alias : {
            react: path.join(__dirname, 'node_modules', 'react'),
            classes: path.join(ROOT_DIR, 'client', 'js', 'classes'),
            components: path.join(ROOT_DIR, 'client', 'js', 'components'),
            flux: path.join(ROOT_DIR, 'client', 'js', 'redux'),
            js: path.join(ROOT_DIR, 'client', 'js')
        }
    },

    output: {
        path: path.join(ROOT_DIR,'build'),
        filename: 'bundle.js'
    },

    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                warnings: false
            }
        })
    ],

    module: {
        loaders: [
            {
                test: /\.es6.js$/,
                loader: 'babel',
                exclude: path.join(ROOT_DIR, 'node_modules'),
                query: {
                    stage: 1
                }
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
            },
            {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    }
};
