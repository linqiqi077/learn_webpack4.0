const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack')

module.exports = {
    // mode: 'production', //生产模式下生效
    mode: 'development',
    entry: {
        index: './src/index.js',
        other: './src/other.js'
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        hot: true,
    },
    optimization: {
        splitChunks: { // 分割代码块
            cacheGroups: { // 缓存组
                common: { // 公共的模块
                    chunks: 'initial', // 从入口开始分析
                    minSize: 0,
                    minChunks: 2
                },
                vendor: { // 第三方公共模块
                    priority: 1, // 权重，优先执行抽离规则
                    test: /node_modules/, // 抽离范围
                    chunks: 'initial', // 从入口开始分析
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react'
                            ],
                            plugins: [
                                '@babel/plugin-syntax-dynamic-import'
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],


            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            filename: 'index.html'
        }),
        new webpack.NamedModulesPlugin(), // 打印更新的模块路径
        new webpack.HotModuleReplacementPlugin() // 热更新插件
    ]
}