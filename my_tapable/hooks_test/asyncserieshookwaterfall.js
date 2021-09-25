
// const { AsyncSeriesWaterfallHook } = require('tapable')
const { AsyncSeriesWaterfallHook } = require('../hooks/index')



class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesWaterfallHook(['name'])
        }
        this.tasks = [];
    }

    tap() { // 注册监听函数
        this.hooks.arch.tapAsync('node', (name, cb) => {
            setTimeout(() => {
                console.log('node', name);
                cb(null, 'result')
            }, 1000)
        })

        this.hooks.arch.tapAsync('webpack', (data, cb) => {
            setTimeout(() => {
                console.log('webpack', data);
                cb(null)
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