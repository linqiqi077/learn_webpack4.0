// 异步的钩子，有串行，并行之分。并行需要等待所有异步事件执行后执行回调

/**
 * 执行方法
 * 1. tap注册 同步
 * 2. tapAsync 异步
 * 3.tapPromise promise
 */
// const { AsyncParallelHook } = require('tapable')
const { AsyncParallelHook } = require('../hooks/index')


class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncParallelHook(['name'])
        }
        this.tasks = [];
    }

    tap() { // 注册监听函数
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);
                cb()
            }, 1000)
        })

        this.hooks.arch.tapAsync('webpack', (name, cb) => {
            setTimeout(() => {
                console.log('webpack', name);
                cb()
            }, 1000)
        })
    }

    start(name, fn) {
        this.hooks.arch.callAsync(name, fn);
    }
}

const l = new Lesson();
l.tap();
l.start('lqq', () => {
    console.log('this end');
})