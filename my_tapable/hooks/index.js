class SyncHook {
    constructor(args) {
        this.tasks = [];
    }

    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => task(...args))
    }
}

// 执行监听函数的回调时，如果返回的不是undefined，则停止执行
class SyncBailHook {
    constructor(args) {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        let res;
        let index = 0;
        do {
            res = this.tasks[index++](...args)
            // 如果执行的结果是undefined 以及 便利的index小于任务次数，则继续循环
        } while (res === undefined && index < this.tasks.length)
    }
}
// 上一个任务的返回，是下一个任务的参数
class SyncWaterfallHook {
    constructor(args) {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }

    call(...args) {
        const [first, ...others] = this.tasks;
        let res = first(...args)
        others.reduce((pre, cur) => {
            cur(pre)
        }, res)

    }
}

// 一个任务不返回undefined就会一直执行
class SyncLoopHook {
    constructor(args) {
        this.tasks = []
    }
    tap(name, task) {
        this.tasks.push(task)
    }
    call(...args) {
        this.tasks.forEach(task => {
            let res;
            do {
                res = task(...args)
            } while (res !== undefined)
        })
    }
}
// 并行异步并行的钩子
class AsyncParallelHook {
    constructor(args) {
        this.tasks = [];
        this.index = 0;
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        const finalCallback = args.pop();
        const done = () => {
            this.index++;
            if (this.index === this.tasks.length) return finalCallback()
        }
        this.tasks.forEach(task => {
            task(...args, done)
        })
    }
}
// 并行执行promise
class AsyncParallelHookToPromise {
    constructor() {
        this.tasks = [];
    }

    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        const taskList = this.tasks.map(task => {
            return task(...args)
        })
        return Promise.all(taskList)
    }

}
// 串行执行
class AsyncSeriesHook {
    constructor() {
        this.tasks = []
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        const finalCallback = args.pop();
        let index = 0;

        const next = () => {
            if (index === this.tasks.length) return finalCallback()
            const task = this.tasks[index++];
            task(...args, next)
        }
        next()
    }

}
// 串行执行promise
class AsyncSeriesHookToPromise {
    constructor() {
        this.tasks = [];
    }

    tapPromise(name, task) {
        this.tasks.push(task)
    }
    promise(...args) {
        const [first, ...others] = this.tasks;

        // redux
        return others.reduce((p, n) => {
            return p.then(() => n(...args))
        }, first(...args))
        // let _promise = Promise.resolve();

        // for (let i = 0; i < this.tasks.length; i++) {
        //     _promise = _promise.then(() => {
        //         return this.tasks[i](...args)
        //     })
        // }
        // return _promise;


    }
}
// 串行执行上一个任务的返回，是下一个任务的参数
class AsyncSeriesWaterfallHook {
    constructor() {
        this.tasks = []
    }
    tapAsync(name, task) {
        this.tasks.push(task)
    }
    callAsync(...args) {
        const finalCallback = args.pop();
        let index = 0;
        // 异步迭代需要一个中间函数
        const next = (err, data) => {
            // 取出第一个任务来执行
            const task = this.tasks[index];
            // 如果没任务，执行最后的结束回调
            if (!task) return finalCallback()

            if (index === 0) {
                task(...args, next)
            } else {
                task(data, next)
            }
            index++;
        }
        next()
    }
}

module.exports = {
    SyncHook,
    SyncBailHook,
    SyncWaterfallHook,
    SyncLoopHook,
    AsyncParallelHook,
    AsyncParallelHookToPromise,
    AsyncSeriesHook,
    AsyncSeriesHookToPromise,
    AsyncSeriesWaterfallHook
};