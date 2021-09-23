/**
 import './a';
import './b';
import './c';
console.log('index');

 */
/**
 * 懒加载
 * const button = document.createElement('button');
button.textContent = "点击"
button.addEventListener('click', function () {
    import('./source').then(data => {
        console.log(data.default);

    })

})

document.body.appendChild(button)
 */

import str from './source';
console.log(str);

