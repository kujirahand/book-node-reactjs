// フィボナッチ数を列挙するGenerator関数を定義
function * genFibonacci () {
  let a = 0
  let b = 1
  while (true) {
    [a, b] = [b, a + b]
    yield a
  }
}

// Generatorオブジェクトを得る
const fib = genFibonacci()
for (const num of fib) {
  // 永遠に計算するので50以上で終了
  if (num > 50) break
  console.log(num)
}
