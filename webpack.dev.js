const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const mode = 'development';

const devtool = 'source-map';

module.exports = merge(common, {
    mode,
    devtool,
    devServer: {
        open: true,
        historyApiFallback: true,
    },
    plugins: [new ReactRefreshWebpackPlugin()],
});
