// Expressのモジュールを取り込んで生成 --- (※1)
const express = require('express')
const app = express()
const portNo = 3000

// アクセスがあった時 --- (※2)
app.get('/', (req, res, next) => {
  res.send('Hello World!')
})

// サーバを起動 --- (※3)
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})


