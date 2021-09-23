
// 自定义配置文件名  可以通过在命令行添加参数--config来指定
// npx webpack --config my.config.js
let path = require('path')
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
}