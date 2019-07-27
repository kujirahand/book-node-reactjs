// Generator関数を定義 --- (※1)
function * counter () {
  yield 1
  yield 2
  yield 3
}
// Generatorオブジェクトを作成 --- (※2)
const g = counter()
// next()メソッドを呼ぶ --- (※3)
console.log(g.next())
console.log(g.next())
console.log(g.next())
console.log(g.next())
