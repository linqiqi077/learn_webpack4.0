const babel = require('@babel/core');
const loaderUtils = require('loader-utils');
function loader(source) {
    // this 是loader的上下文
    const options = loaderUtils.getOptions(this)
    let cb = this.async()
    babel.transform(source, {
        ...options,
        sourceMap: true,
        filename: this.resourcePath.split('/').pop()
    }, (err, result) => {
        cb(err, result.code, result.map)
    })
}

module.exports = loader;