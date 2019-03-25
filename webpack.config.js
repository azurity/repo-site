const path = require('path')
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
    entry: {
        index: './src/index.ts'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            '@': path.resolve(__dirname, 'src')
        }
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'ts-loader' },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                material: {
                    test: /[\\/]node_modules[\\/]@material-ui[\\/]/,
                    name: 'material',
                    chunks: 'all'
                },
                commons: {
                    test: /[\\/]node_modules[\\/](?!@material-ui[\\/])/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    plugins: [
        new CopyWebpackPlugin([
            { from: 'assets/index.html' }
            //{ from: 'node_modules/highlight.js/styles/solarized-dark.css', to: 'hightlight.css' }
        ])
    ]
}
