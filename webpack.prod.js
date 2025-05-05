const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const mode = 'production';

const devtool = 'source-map';

module.exports = merge(common, {
    mode,
    devtool,
    optimization: {
        minimize: true,
    },
});
