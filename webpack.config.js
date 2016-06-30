"use strict";
/**
 * Created by JackieWu
 * 多页面的webpack配置
 */

const fs = require('fs');
const webpack = require('webpack');
const path = require('path');
const exec = require('child_process').exec;
const HtmlWebpackPlugin = require('html-webpack-plugin');

const ENV = process.env.npm_lifecycle_event;

module.exports = (() => {
    const config = {};
    config.plugins = [];
    config.entry = {
        index : './src/index.js'
    };
    config.output = {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    };


    if (ENV === 'build') {
        exec('rm -rf build');
        config.plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

    config.module = {
        loaders: [
            {
                // HTML LOADER
                // Reference: https://github.com/webpack/raw-loader
                // Allow loading html through js
                test: /\.html$/,
                loader: 'raw'
            },
            {
                test: [/\.js$/, /\.jsx$/],
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    compact: true
                }
            }
        ]
    };

    config.plugins.push(
        // Reference: http://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        // Dedupe modules in the output
        new webpack.optimize.DedupePlugin(),
        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './src/index.html',
            inject: 'body'
        })
    );

    /**
     * Dev server configuration
     * Reference: http://webpack.github.io/docs/configuration.html#devserver
     * Reference: http://webpack.github.io/docs/webpack-dev-server.html
     */
    config.devServer = {
        contentBase: './',
        stats: 'minimal'
    };


    return config;
})();
