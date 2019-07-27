'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// BMIの計算クラスを定義
var BMI = function () {
  function BMI(height, weight) {
    _classCallCheck(this, BMI);

    this.height = height;
    this.weight = weight;
    this.bmi = this.calc();
  }

  _createClass(BMI, [{
    key: 'calc',
    value: function calc() {
      var heightM = this.height / 100;
      return this.weight / heightM ** 2;
    }
  }, {
    key: 'print',
    value: function print() {
      var res = '普通';
      if (this.bmi >= 25) res = '肥満';else if (this.bmi >= 18.5) res = '普通';else res = '痩せ';
      console.log('BMI=', this.bmi, res);
    }
  }]);

  return BMI;
}();
// テスト


var bmi = new BMI(160, 60);
bmi.print();
