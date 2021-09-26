const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'source-map',
    resolveLoader: {
        /**1.通过别名制定loader的加载路径
         *  alias:{
             "babel-loader":path.resolve(__dirname,'loaders,'babel-loader')
         }
         */
        // 设定加载loader的查找顺序
        modules: ['node_modules', path.resolve(__dirname, 'loaders')]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env'
                        ]
                    }
                }
            }
        ]
    }
}