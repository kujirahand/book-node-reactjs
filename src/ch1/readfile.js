// ファイルを非同期で読み込む
const fs = require('fs') // fsモジュールを使う

// ファイルの読み込み
fs.readFile('kakugen.txt', 'utf-8', kakugenLoaded)

// 読み込みが完了したときのイベント
function kakugenLoaded (err, data) {
  if (err) {
    console.log('読み込みに失敗。')
    return
  }
  console.log(data)
}
