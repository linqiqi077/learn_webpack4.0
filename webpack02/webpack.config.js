//  html-webpack-plugin 的大版本需要和webpack的大版本一致。
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack');
let path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle[hash:8].js',
        path: path.resolve(__dirname, 'dist')
    },
    // dev 配置
    devServer: {
        port: 3000,
        progress: true,
        contentBase: '/dist',
        compress: true,
        open: true
    },
    module: {
        rules: [
            /**
            校验
            {
                test: /\.js$/,
                use: {
                    loader: 'eslint-loader',
                    options: {
                        enforce: 'pre', // 'previous'
                    }
                },
            },
            */
            {
                test: /\.html$/,
                use: {
                    loader: 'html-withimg-loader',
                }
            },
            // 把jquery 变成$ 全局变量
            {
                test: require.resolve('jquery'),
                use: 'expose-loader?$'
            },
            /**
             *  {
                 test: /\.css$/,
                 use: [
                     
                      * loader用法：
                      * 字符串只用一个loader loader:"css-loader"
                      * 多个loader用[] use:['style-loader','css-loader']
                      * 需要添加配置用{} use:[{loader:'style-loader,options:{}}]
                      * loader执行顺序，右到左，下到上
                      
                      {
                         loader: 'style-loader',
                     }, // style-loader 把解析好的css用style标签插进html中
                     'css-loader' // css-loader 解析@import这种语法
                 ]
             },
             */
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader' // css-loader 解析@import这种语法
                ]
            },
            {
                test: /\.less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader'
                ]
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: { // 用babel-loader，把es6 转成es5
                        presets: [
                            '@babel/preset-env',
                        ],
                        plugins: [
                            '@babel/plugin-proposal-class-properties'
                        ]

                    }

                },
                exclude: /node_modules/,
                include: path.resolve(__dirname, 'src')
            },
            {
                test: /\.(png|jpg)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        esModule: false,
                        limit: '100*1024',
                        // 配置输入路径，图片放在/img路径下
                        outputPath: 'img/'
                    }
                },
            }
        ]
    },
    externals: {
        jquery: '$'
    },
    // 插件
    plugins: [
        // 处理html
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            // minify: {
            //     removeAttributeQuotes: true, // 去掉双引号
            //     // collapseWhitespace: true, // html压缩成一行
            // },
            hash: true
        }),
        // new webpack.ProvidePlugin({
        //     // 在每个模块中都注入$
        //     $: 'jquery'
        // })
        new MiniCssExtractPlugin({
            filename: 'main.css',
        })
    ]
}