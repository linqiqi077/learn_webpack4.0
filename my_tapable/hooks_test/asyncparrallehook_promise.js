// 异步的钩子，有串行，并行之分。并行需要等待所有异步事件执行后执行回调

/**
 * 执行方法
 * 1. tap注册 同步
 * 2. tapAsync 异步
 * 3.tapPromise promise
 * 
 * 三种注册方法
 * tap call
 * tapAsync 异步注册 callAsync
 * tapPromise 注册promise promise
 */
// const { AsyncParallelHooke } = require('tapable')
const { AsyncParallelHookToPromise } = require('../hooks/index')


class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncParallelHookToPromise(['name'])
        }
        this.tasks = [];
    }

    tap() { // 注册监听函数
        this.hooks.arch.tapPromise('node', (name, cb) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve()
                }, 1000)
            })
        })

        this.hooks.arch.tapPromise('react', (name, cb) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('react', name);
                    resolve()
                }, 1000)
            })
        })
    }

    start(name) {
        this.hooks.arch.promise(name).then(() => {
            console.log('this end');
        });
    }
}

const l = new Lesson();
l.tap();
l.start('lqq')