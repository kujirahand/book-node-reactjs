// 機能を取り込み --- (※1)
const request = require('superagent')

// 指定のURLからデータを取得する --- (※2)
const URL = 'http://localhost:3000/fruits.json'
request.get(URL)
       .end(callbackGet)

// データを取得した時の処理 --- (※3)
function callbackGet (err, res) {
  if (err) {
    // 取得できなかった時の処理
    return
  }
  // ここで取得したときの処理
  console.log(res.body)
}
