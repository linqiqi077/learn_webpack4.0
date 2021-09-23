
// const { AsyncSeriesHook } = require('tapable')
const { AsyncSeriesHookToPromise } = require('../hooks/index')



class Lesson {
    constructor() {
        this.hooks = {
            arch: new AsyncSeriesHookToPromise(['name'])
        }
        this.tasks = [];
    }

    tap() { // 注册监听函数
        this.hooks.arch.tapPromise('node', (name) => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    console.log('node', name);
                    resolve()
                }, 1000)
            })
        })

        this.hooks.arch.tapPromise('react', (name) => {
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