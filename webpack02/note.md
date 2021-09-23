### loader类型
- 前置loader 用法:enforce: 'pre'
- normal loader
- 内联loader expose-loader;用法: import $ from 'expose-loader?$!jquery';（把jquery暴露为$）


#### webpack暴露全局的方式
1. expose-loader 暴露到window上
2. ProvidePlugin 插件，给每个模块都注入某个变量
3. 通过配置 externals，做到引入不打包

#### 属性配置
1. resolve
```javascript
resolve:{
    alias :{ // 别名，比如原本需要引入 lqq-ui/icons/index.js可以设置为lqq
        lqq: 'lqq-ui/icons/index.js'
    },
    modules:[path.resolve('node_modules')], // 限制查找范围为node_modules。也可以往数组中添加多个访问源
      mainFiles:['js','ts','css'] // 主入口查询文件后缀顺序
    extensions:['js','ts','css'] // 引入文件扩展名查找顺序
}
```
#### 定义环境变量
1. webpack.DefinePlugin
- 如果需要做字符串替换，通用方式为JSON.stringify('dev')
```javascript
webpack.DefinePlugin({
    DEV:"'dev'" // 这里需要字符串替换 console.log(DEV)相当于console.log('dev')
})
```
