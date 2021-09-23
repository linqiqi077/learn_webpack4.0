const path = require('path');
const webpack = require('webpack')

module.exports = {
    mode: 'development',
    entry: {
        react: ['react', 'react-dom'] // 打包react，react-dom的资源
    },
    output: {
        filename: '_dll_[name].js', // 产生的文件名
        path: path.resolve(__dirname, 'dist'),
        library: '_dll_[name]', // 定义输入结果接收的变量
        // libraryTarget: 'var' // commonjs umd var this... 
    },
    plugins: [
        // manifest.json 相当于给 react ,react-dom 建一个链接缓存 。简称动态链接
        new webpack.DllPlugin({ // name === library
            name: '_dll_[name]',
            path: path.resolve(__dirname, 'dist', 'manifest.json')
        })
    ]
}