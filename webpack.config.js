'use strict';

const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {

    let config = {
        entry: './src/app.js',
        output: {
            filename: 'build.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.pug$/,
                    use: ['html-loader?attrs=false', 'pug-html-loader']
                },
                {
                    test: /\.scss$/,
                    use: [
                        {
                            loader: argv.mode !== 'production' ? 'style-loader' : MiniCssExtractPlugin.loader
                        },
                        {
                            loader: "css-loader"
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: ['node_modules/normalize-scss/sass'],
                                data: `
                                 @import './src/scss/scss-assets/_variables.scss';
                                 @import './src/scss/scss-assets/_mixins.scss';
                                 @import './src/scss/scss-assets/_functions.scss';
                                 @import './src/scss/scss-assets/_config.scss';
                                 `
                            }
                        }
                    ]
                },
                {
                    test: /\.(ttf|eot|svg|woff2?)(\?v=[a-z0-9=\.]+)?$/i,
                    loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
                },
            ]
        },
        devtool: 'source-map',
        plugins: [
            new MiniCssExtractPlugin({
                filename: 'common.css'
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: 'src/index.pug',
                inject: false
            })
        ]
    };

    return config;
};
