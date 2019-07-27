// --------------------------------------------------------
// WikiのWebサーバ
// --------------------------------------------------------
// データベースに接続 --- (※1)
const path = require('path')
const NeDB = require('nedb')
const db = new NeDB({
  filename: path.join(__dirname, 'wiki.db'),
  autoload: true
})

// WEBサーバを起動 --- (※2)
const express = require('express')
const app = express()
const portNo = 3001
// body-parserを有効にする
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended: true}))
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

// APIの定義
// Wikiデータを返すAPI --- (※3)
app.get('/api/get/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  db.find({name: wikiname}, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err})
      return
    }
    if (docs.length === 0) {
      docs = [{name: wikiname, body: ''}]
    }
    res.json({status: true, data: docs[0]})
  })
})

// Wikiデータを書き込むAPI --- (※4)
app.post('/api/put/:wikiname', (req, res) => {
  const wikiname = req.params.wikiname
  console.log('/api/put/' + wikiname, req.body)
  // 既存のエントリがあるか確認
  db.find({'name': wikiname}, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err})
      return
    }
    const body = req.body.body
    if (docs.length === 0) { // エントリがなければ挿入
      db.insert({name: wikiname, body})
    } else { // 既存のエントリを更新
      db.update({name: wikiname}, {name: wikiname, body})
    }
    res.json({status: true})
  })
})

// publicディレクトリを自動で返す --- (※5)
app.use('/wiki/:wikiname', express.static('./public'))
app.use('/edit/:wikiname', express.static('./public'))
app.get('/', (req, res) => {
  res.redirect(302, '/wiki/FrontPage')
})
