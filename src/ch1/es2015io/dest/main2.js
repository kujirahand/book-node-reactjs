'use strict';

var _calctest = require('./calctest.js');

var ct = _interopRequireWildcard(_calctest);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// モジュールの関数を使う
console.log(ct.add(2, 3)); // モジュールを取り込む

console.log(ct.mul(6, 8));