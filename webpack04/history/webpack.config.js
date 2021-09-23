const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const Happypack = require('happypack')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bunlde.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
        port: 3000,
        open: true,
        contentBase: './dist'
    },
    module: {
        noParse: /jquery/, // 不去解析jquery中的依赖关系
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,// 排除
                // include: path.resolve('src'), // 包含
                /**
                 *  use: {
                      loader: 'babel-loader',
                      options: {
                          presets: [
                              '@babel/preset-env',
                              '@babel/preset-react'
                          ],
                      }
                  }
                 */
                use: 'Happypack/loader?id=js' // 标识多进程作用于js
            },
            {
                test: /\.css$/,
                use: 'Happypack/loader?id=css'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/index.html',
        }),
        new webpack.IgnorePlugin(/\.\/local/, /moment/), // 忽略 moment 中 引入的 ./local 文件
        // 引用动态链接库
        new webpack.DllReferencePlugin({
            manifest: path.resolve(__dirname, 'dist', 'manifest.json')
        }),
        new Happypack({
            id: 'js', // js会用到 以下 loader打包
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ],
                    }
                }
            ]
        }),
        new Happypack({
            id: 'css',
            use: [
                'style-loader',
                'css-loader'
            ]


        })
    ]
}