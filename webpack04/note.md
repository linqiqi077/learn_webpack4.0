#### webpack优化手段

- noParse
> 忽略一些库内部的依赖关系

- IgnorePlugin
> 忽略第三方库内部引入的文件，如 moment 中引入的语言包

- exclude
> 运行时排除哪些路径

- include
> 运行时只作用于哪些路径

- 动态链接库 DllPlugin
> 维基百科对"动态链接库"的理解如下:
> 所谓动态链接，就是把一些经常会共享的代码制作成 DLL 档，当可执行文件调用到 DLL 档内的函数时，Windows 操作系统才会把 DLL 档加载存储器内，DLL 档本身的结构就是可执行档，当程序有需求时函数才进行链接。透过动态链接方式，存储器浪费的情形将可大幅降低。
> 个人理解就是对一些常用的库做个映射文件。比如 react，react-dom

- 多线程打包 happypack


#### webpack自带的优化
- tree shaking (摇树,意思是把树木上多余的叶子要下来，理解为按需加载)
> 1. 只能用在静态加载，比如import引入，静态加载可以在编译阶段知道其依赖关系来做按需加载，而require，import(()=>{})这种在运行时解析依赖关系的情况不适合做tree-shaking。
> 2. tree-shaking在production模式下自动生效。

- scope hosting 作用域提升
> 在生产环境下会自动省略不必要的代码,比如:
```javascript
const a =1;
const b = 2;
const c = 3;
console.log(a + b +c,'sum') 
// 上面情况webpack会直接给我们编译成: console.log(6,'sum'),这样省去了不必要的a,b,c的赋值和重复声明变量的操作
```

- 抽取公共模块(第三方/本地公共代码抽取) splitChunks
```javascript
   optimization: { // 优化配置
        splitChunks: { // 分割代码块
            cacheGroups: { // 缓存组
                common: { // 本地公共的模块抽取
                    chunks: 'initial', // 从入口开始分析
                    minSize: 0,
                    minChunks: 2
                },
                vendor: { // 第三方公共模块抽取
                    priority: 1, // 权重，优先执行高权重抽离规则
                    test: /node_modules/, // 抽离范围
                    chunks: 'initial', // 从入口开始分析
                    minSize: 0,
                    minChunks: 2
                }
            }
        }
    },
```

#### 懒加载
- 通过babel的**@babel/plugin-syntax-dynamic-import** 插件达成 import()动态加载功能
