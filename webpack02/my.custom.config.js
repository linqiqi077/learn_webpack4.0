
// 通过执行npm 脚本自定义配置文件名  可以通过在参数--config前加 "--"
// npm run build -- --config my.custom.config.js
//  html-webpack-plugin 的大版本需要和webpack的大版本一致。
const HtmlWebpackPlugin = require('html-webpack-plugin')
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
            {
                test: /\.css$/,
                use: [
                    /**
                     * loader用法：
                     * 字符串只用一个loader loader:"css-loader"
                     * 多个loader用[] use:['style-loader','css-loader']
                     * 需要添加配置用{} use:[{loader:'style-loader,options:{}}]
                     * loader执行顺序，右到左，下到上
                     */
                    {
                        loader: 'style-loader',
                    }, // style-loader 把解析好的css用style标签插进html中
                    'css-loader' // css-loader 解析@import这种语法
                ]
            },
            {
                test: /\.less$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'less-loader'
                ]
            }
        ]
    },
    // 插件
    plugins: [
        // 处理html
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'index.html',
            minify: {
                removeAttributeQuotes: true, // 去掉双引号
                // collapseWhitespace: true, // html压缩成一行
            },
            hash: true
        }),
    ]
}