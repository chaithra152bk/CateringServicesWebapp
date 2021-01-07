'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const CleanPlugin = require('./utils/clean-plugin');
const NodeUtils = require('./src/services/common/node-service');

const appConfig = require('./config/config');

const config = {
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.[hash].js',
        publicPath: '/'
    },
    plugins: [
        new CleanPlugin({
            files: ['dist/*']
        }),
        new MiniCssExtractPlugin({
            filename: NodeUtils.isProduction() ? '[name].[hash].css' : '[name].css',
            chunkFilename: NodeUtils.isProduction() ? '[id].[hash].css' : '[id].css'
        }),
        new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html'),
            inject: 'body',
            // favicon: "./public/globallineupfavicon.png",
            minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(
                    process.env.NODE_ENV
                ),
                APP_CONFIG: JSON.stringify(
                    appConfig
                )
            }
        }),
        new ManifestPlugin(),
        new CopyWebpackPlugin([
            { from: './public/web.config' }
        ])
    ],
    module: {
        exprContextCritical: false, // Suppress "The request of a dependency is an expression"
        rules: [
            {
                test: /\.(js|jsx)$/,
                loaders: 'babel-loader',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.scss$/,
                use:
                    NodeUtils.isProduction()
                        ? [MiniCssExtractPlugin.loader, 'css-loader',
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    autoprefixer({
                                        browsers: ['last 2 version']
                                    })
                                ]
                            }
                        }, 'sass-loader']
                        : ['style-loader', 'css-loader', 'sass-loader'],
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/,
                loader: 'url-loader?limit=10000&name=[name]-[hash].[ext]',
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.ico$/,
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.json$/,
                include: path.join(__dirname, 'src')
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};

if (NodeUtils.isProduction()) {
    config.entry = './src/app';
    config.mode = 'production';
} else {
    config.devtool = 'eval';
    config.mode = 'development';
    config.entry = [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://localhost:${appConfig.example.port}`,
        'webpack/hot/only-dev-server',
        './src/app'
    ];
    config.plugins.push(
        new webpack.HotModuleReplacementPlugin()
    );
}

module.exports = config;
