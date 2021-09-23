
// const { AsyncSeriesHook } = require('tapable')
const { AsyncSeriesHook } = require('../hooks/index')



class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesHook(['name'])
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