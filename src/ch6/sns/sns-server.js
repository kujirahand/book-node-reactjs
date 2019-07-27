// --------------------------------------------------------
// SNSサーバ
// --------------------------------------------------------
// データベースに接続 --- (※1)
const db = require('./server/database')

// WEBサーバを起動 --- (※2)
const express = require('express')
const app = express()
const portNo = 3001
app.listen(portNo, () => {
  console.log('起動しました', `http://localhost:${portNo}`)
})

// APIの定義
// ユーザ追加用のAPI - ユーザを追加する --- (※3)
app.get('/api/adduser', (req, res) => {
  const userid = req.query.userid
  const passwd = req.query.passwd
  if (userid === '' || passwd === '') {
    return res.json({status: false, msg: 'パラメータが空'})
  }
  // 既存ユーザのチェック
  db.getUser(userid, (user) => {
    if (user) { // 既にユーザがいる
      return res.json({status: false, msg: '既にユーザがいます'})
    }
    // 新規追加
    db.addUser(userid, passwd, (token) => {
      if (!token) {
        res.json({status: false, msg: 'DBのエラー'})
      }
      res.json({status: true, token})
    })
  })
})
// ユーザログイン用のAPI - ログインするとトークンを返す --- (※4)
app.get('/api/login', (req, res) => {
  const userid = req.query.userid
  const passwd = req.query.passwd
  db.login(userid, passwd, (err, token) => {
    if (err) {
      res.json({status: false, msg: '認証エラー'})
      return
    }
    // ログイン成功したらトークンを返す
    res.json({status: true, token})
  })
})
// 友達追加API --- (※5)
app.get('/api/add_friend', (req, res) => {
  const userid = req.query.userid
  const token = req.query.token
  const friendid = req.query.friendid
  db.checkToken(userid, token, (err, user) => {
    if (err) { // 認証エラー
      res.json({status: false, msg: '認証エラー'})
      return
    }
    // 友達追加
    user.friends[friendid] = true
    db.updateUser(user, (err) => {
      if (err) {
        res.json({status: false, msg: 'DBエラー'})
        return
      }
      res.json({status: true})
    })
  })
})
// 自分のタイムラインに発言 --- (※6)
app.get('/api/add_timeline', (req, res) => {
  const userid = req.query.userid
  const token = req.query.token
  const comment = req.query.comment
  const time = (new Date()).getTime()
  db.checkToken(userid, token, (err, user) => {
    if (err) {
      res.json({status: false, msg: '認証エラー'})
      return
    }
    // タイムラインに追加
    const item = {userid, comment, time}
    db.timelineDB.insert(item, (err, it) => {
      if (err) {
        res.json({status: false, msg: 'DBエラー'})
        return
      }
      res.json({status: true, timelineid: it._id})
    })
  })
})
// ユーザの一覧を取得 --- (※7)
app.get('/api/get_allusers', (req, res) => {
  db.userDB.find({}, (err, docs) => {
    if (err) return res.json({status: false})
    const users = docs.map(e => e.userid)
    res.json({status: true, users})
  })
})
// ユーザ情報を取得 --- (※8)
app.get('/api/get_user', (req, res) => {
  const userid = req.query.userid
  db.getUser(userid, (user) => {
    if (!user) return res.json({status: false})
    res.json({status: true, friends: user.friends})
  })
})
// 友達のタイムラインを取得 --- (※9)
app.get('/api/get_friends_timeline', (req, res) => {
  const userid = req.query.userid
  const token = req.query.token
  db.getFriendsTimeline(userid, token, (err, docs) => {
    if (err) {
      res.json({status: false, msg: err.toString()})
      return
    }
    res.json({status: true, timelines: docs})
  })
})

// 静的ファイルを自動的に返すようルーティングする --- (※10)
app.use('/public', express.static('./public'))
app.use('/login', express.static('./public'))
app.use('/users', express.static('./public'))
app.use('/timeline', express.static('./public'))
app.use('/', express.static('./public'))
