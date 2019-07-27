'use strict';

var _calctest = require('./calctest.js');

// 取り込んだ関数を利用する
console.log((0, _calctest.add)(2, 3)); // 自作の計算モジュール「calctest.js」を取り込む

console.log((0, _calctest.mul)(6, 8));