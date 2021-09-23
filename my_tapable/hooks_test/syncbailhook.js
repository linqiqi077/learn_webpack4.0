// 执行监听函数的回调时，如果返回的不是undefined，则停止执行
// const { SyncBailHook } = require('tapable')
const { SyncBailHook } = require('../hooks/index')

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncBailHook(['name'])
        }
    }
    tap() {
        this.hooks.arch.tap('node', () => {
            console.log('node 我想一直学习');
            return undefined
        })

        this.hooks.arch.tap('react', () => {
            console.log('我可能学不了这个');
        })
    }
    start() {
        this.hooks.arch.call('try')
    }
}

const l = new Lesson()
l.tap()
l.start()