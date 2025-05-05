const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const mode = 'development';

const devtool = 'source-map';

module.exports = merge(common, {
    mode,
    devtool,
    devServer: {
        open: true,
        historyApiFallback: true,
    },
});
