const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'index.js',
        libraryTarget: 'commonjs'
    },
    plugins: [
        new webpack.DefinePlugin({ "global.GENTLY": false })
    ],
    target: 'node',
    mode: 'production'
}