// --------------------------------------------------------
// 掲示板アプリのWebサーバ側
// --------------------------------------------------------
// データベースに接続 --- (*1)
const NeDB = require('nedb')
const path = require('path')
const db = new NeDB({
  filename: path.join(__dirname, 'bbs.db'),
  autoload: true
})

// サーバを起動 --- (*2)
const express = require('express')
const app = express()
const portNo = 3001
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

// publicディレクトリ以下は自動的に返す --- (*3)
app.use('/public', express.static('./public'))
// トップへのアクセスを/publicへ流す
app.get('/', (req, res) => {
  res.redirect(302, '/public')
})

// apiの定義
// ログの取得API --- (*4)
app.get('/api/getItems', (req, res) => {
  // データベースを書き込み時刻でソートして一覧を返す
  db.find({}).sort({stime: 1}).exec((err, data) => {
    if (err) {
      sendJSON(res, false, {logs: [], msg: err})
      return
    }
    console.log(data)
    sendJSON(res, true, {logs: data})
  })
})

// 新規ログを書き込むAPI --- (*5)
app.get('/api/write', (req, res) => {
  const q = req.query
  // URLパラメータの値をDBに書き込む
  db.insert({
    name: q.name,
    body: q.body,
    stime: (new Date()).getTime()
  }, (err, doc) => {
    if (err) {
      console.error(err)
      sendJSON(res, false, {msg: err})
      return
    }
    sendJSON(res, true, {id: doc._id})
  })
})

function sendJSON (res, result, obj) {
  obj['result'] = result
  res.json(obj)
}
