const text = require('./a.js')
console.log(text);
require('./index.css')
require('./index.less')

const fn = () => {
    console.log('arrow');

}

fn()

class A {
    a = 1;
}

const a = new A();
console.log(a.a);
