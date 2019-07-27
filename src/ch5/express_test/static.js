// Expressを起動
const express = require('express')
const app = express()
// 待ち受け開始
app.listen(3000, () => {
  console.log('起動しました - http://localhost:3000')
})
// 静的ファイルを自動的に返すよう設定
app.use('/', express.static('./html'))

