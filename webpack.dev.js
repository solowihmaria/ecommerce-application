const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const mode = 'development';

const devtool = 'inline-source-map';

module.exports = merge(common, {
    mode,
    devtool,
    devServer: {
        open: false,
        historyApiFallback: true,
        hot: true,
    },
    plugins: [new ReactRefreshWebpackPlugin()],
    module: {
        rules: [
            {
                test: /\.(c|sa|sc)ss$/i,
                use: [
                    'style-loader',
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
                    'style-loader',
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
