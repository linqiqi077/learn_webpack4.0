// 同步遇到某个不返回undefined的监听函数会多次执行
// const { SyncLoopHook } = require('tapable')
const { SyncLoopHook } = require('../hooks/index')

class Lesson {
    constructor() {
        this.index = 0
        this.hooks = {
            arch: new SyncLoopHook(['name'])
        }
    }
    tap() {
        this.hooks.arch.tap('node', () => {
            console.log('node 我想一直学习');
            return ++this.index === 3 ? undefined : '继续学习node！'
        })

        this.hooks.arch.tap('react', (data) => {
            console.log('我可能学不了这个', data); // 我可能学不了这个 node 学的不错
        })

        this.hooks.arch.tap('webpack', (data) => {
            console.log('webpack', data); // 我可能学不了这个 node 学的不错
        })
    }
    start() {
        this.hooks.arch.call('try')
    }
}

const l = new Lesson()
l.tap()
l.start()