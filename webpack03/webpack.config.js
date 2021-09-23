let path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    // 多入口
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    // devtool: 'source-map', // 产生一个新文件，可以定位行和列
    // devtool: 'eval-source-map', // 不会产生单独的文件，但是可以定位行和列
    // devtool: 'cheap-module-source-map', // 不会定位到列，但是是一个单独的文件
    devtool: 'cheap-module-eval-source-map', // 不会定位到列，也没有产生新的文件
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    watch: true,
    watchOptions: { // 监控的选项
        poll: 10000,// 每秒 问我 1000次
        aggregateTimeout: 500,// 防抖
        ignored: /node_modules/,// 不需要进行监控的选项
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            filename: 'index.html',
        }),
        // 清空插件
        new CleanWebpackPlugin('dist'),
        // 拷贝插件
        new CopyWebpackPlugin([{
            from: './doc', to: ''
        }]),
        // 版权声明插件，声明插入打包后的每个文件
        new webpack.BannerPlugin("linqiqi 2021")
    ]
}