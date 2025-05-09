const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
    devServer: {
        open: true,
        historyApiFallback: true,
        hot: true,
    },
    entry: './src/index.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[contenthash].js',
        clean: true,
    },
    resolve: {
        extensions: ['.ts', '.js', '.tsx', '.jsx'],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, './src/index.html'),
        }),
        new ESLintPlugin({ extensions: ['ts', 'tsx'] }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: 'html-loader',
            },
            {
                test: /\.jpe?g$|\.svg$|\.png$|\.ico$|\.mp3$/,
                use: ['file-loader'],
            },
            {
                test: /\.(ts|tsx|js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-typescript',
                            ['@babel/preset-react', { runtime: 'automatic' }],
                        ],
                        plugins: [
                            process.env.NODE_ENV === 'development' &&
                                require.resolve('react-refresh/babel'),
                        ].filter(Boolean),
                    },
                },
            },
        ],
    },
};
