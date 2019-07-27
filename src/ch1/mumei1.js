// 無名関数を利用して関数を定義
const f1 = function (s) { console.log(s) }
const f2 = (s) => { console.log(s) }

// 無名関数は普通の関数と同じように使える
f1('hoge')
f2('fuga')
