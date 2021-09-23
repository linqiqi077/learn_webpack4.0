// 上一个任务的返回值，是下一个任务的参数。
// const { SyncWaterfallHook } = require('tapable')
const { SyncWaterfallHook } = require('../hooks/index')

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name'])
        }
    }
    tap() {
        this.hooks.arch.tap('node', () => {
            console.log('node 我想一直学习');
            return 'node 学的不错'
        })

        this.hooks.arch.tap('react', (data) => {
            console.log('我可能学不了这个', data); // 我可能学不了这个 node 学的不错
        })
    }
    start() {
        this.hooks.arch.call('try')
    }
}

const l = new Lesson()
l.tap()
l.start()