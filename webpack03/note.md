#### 多入口
- entry
> 对象类型，标明是多入口
- output
> 用[name]表明输出文件与entry的key一致
- 多html模板
> 通过new 多个 htmlWebpackPlugin 实例，配置 chunks 来达到按需引入代码块的结果

#### source-map

- source-map
> 源码映射，会单独生成一个sourcemap文件，出错了，会标识当前报错的列和行

- eval-source-map
> 不会产生单独的文件，但是可以显示行和列

- cheap-module-source-map
> 不会产生列，但是是一个单独的文件

- cheap-module-eval-source-map
> 不会产生文件，集成在打包后的文件中，不会产生列

#### 实时打包
- watch: true

#### 其他插件
- CleanWebpackPlugin
> 清空插件，每次打包前清空指定插件

- CopyWebpackPlugin
> 拷贝插件，可以指定拷贝文件

- webpack.BannerPlugin
> webpack自带的版权声明插件，在打包后的每个js文件中插入版权声明