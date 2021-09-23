/**
 import jquery from 'jquery';
import moment from 'moment';

// moment.locale('zh-cn') 因为用webpack.ignorePlugin忽略了默认导入的语言包，所以这里失效了，需要手动引入语言包
import "moment/locale/zh-cn"
let r = moment().endOf('day').fromNow()
console.log(r)
 */

/**
 import React from 'react';
import { render } from 'react-dom';
console.log(document.getElementById('root'))
render(<h1>jsx1</h1>, document.getElementById('root'))
 */

// import calc from './test';
// const calc = require('./test')
// es6 默认会到处default
// console.log(calc.default.add(1, 2))

/**
 * const a = 1;
const b = 2;
const c = 3;
console.log(a + b + c, 'sum');
 */
