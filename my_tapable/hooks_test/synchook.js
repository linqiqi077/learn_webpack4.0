// const { SyncHook } = require('tapable')
const { SyncHook } = require('../hooks/index')


class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncHook(['name'])
        }
        this.tasks = [];
    }

    tap() { // 注册监听函数
        this.hooks.arch.tap('node', (name) => {
            console.log('node', name);
        })

        this.hooks.arch.tap('webpack', (name) => {
            console.log('webpack', name);
        })
    }

    start(name) {
        this.hooks.arch.call(name);
    }
}

const l = new Lesson();
l.tap();
l.start('lqq')