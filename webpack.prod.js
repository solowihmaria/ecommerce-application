const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const mode = 'production';

module.exports = merge(common, {
    mode,
    devtool: false,
    optimization: {
        minimize: true,
        splitChunks: {
            chunks: 'all',
        },
    },
    performance: {
        hints: 'warning',
        maxAssetSize: 350000,
        maxEntrypointSize: 400000,
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.[contenthash].css',
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: false,
                        },
                    },
                    'sass-loader',
                ],
                exclude: /\.module\.scss$/,
            },
            {
                test: /\.(sa|sc)ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 1,
                            modules: {
                                mode: 'local',
                                exportOnlyLocals: false,
                                namedExport: false,
                            },
                        },
                    },
                    'sass-loader',
                ],
                include: /\.module\.scss$/,
            },
        ],
    },
});
