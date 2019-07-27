const express = require('express')
const app = express()
const portNo = 3000

// ルートへのアクセス
app.get('/', (req, res) => {
  res.send(
    '<p><a href="/dice/6">6面体のサイコロ</a><br />' +
    '<a href="/dice/12">12面体のサイコロ</a></p>')
})

// サイコロへのアクセス --- (※1)
app.get('/dice/:num', (req, res) => {
  res.send('今回の値は...' + dice(req.params.num))
})

function dice(n) {
  return Math.floor(Math.random() * n) + 1
}

app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})


