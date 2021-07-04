const path = require('path')
const webpack = require('webpack');
const base = require('../webpack-app.config');
const merge = require('webpack-merge');
const CopyPlugin = require('copy-webpack-plugin');

const config = merge(base, {

    output: {
        path: path.resolve( __dirname, "./../dist/build" ),
        publicPath: "/",
        filename: 'Bundle.js'
    },

    plugins: [
        new CopyPlugin([
        ])
    ]
});

module.exports = config;
