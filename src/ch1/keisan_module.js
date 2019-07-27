// 足し算と掛け算の関数
function add (a, b) {
  return a + b
}
function mul (a, b) {
  return a * b
}

// 外部に公開する
module.exports = {
  'add': add,
  'mul': mul
}
