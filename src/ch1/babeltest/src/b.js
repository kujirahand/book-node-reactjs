// クラスHogeを定義
class Hoge {
  constructor () {
    this.value = 100
  }
  fuga () {
    console.log('Hoge.fuga')
    console.log(this.value)
  }
}
// Hogeを使う
const h = new Hoge()
h.fuga()
