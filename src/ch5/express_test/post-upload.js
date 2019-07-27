// Expressを起動
const express = require('express')
const app = express()

// multerの準備 --- (※1)
const multer = require('multer')
const path = require('path')
// どこにアップロードするか指定 --- (※2)
const tmpDir = path.join(__dirname, 'tmp')
const pubDir = path.join(__dirname, 'pub')
const uploader = multer({dest: tmpDir})
// 待ち受け開始
app.listen(3000, () => {
  console.log('起動しました - http://localhost:3000')
})
// アップロードフォームを表示 --- (※3)
app.get('/', (req, res) => {
  res.send(
    '<form method="POST" action="/" enctype="multipart/form-data">' +
    '<input type="file" name="aFile" /><br />' +
    '<input type="submit" value="アップロード" />' +
    '</form>')
})
// 静的ファイルは勝手に返すようにする --- (※4)
app.use('/pub', express.static(pubDir))
// アップロードを受け付ける --- (※5)
app.post('/', uploader.single('aFile'), (req, res) => {
  console.log('ファイルを受け付けました')
  console.log('オリジナルファイル名:', req.file.originalname)
  console.log('保存したパス:', req.file.path)
  // MIMEでファイル形式のチェック --- (※6)
  if (req.file.mimetype !== 'image/png') {
    res.send('PNG画像以外はアップロードしません')
    return
  }
  // TODO: 本当にPNGかここでチェックする --- (※7)
  // ファイルを移動する --- (※8)
  const fname = req.file.filename + '.png'
  const des = pubDir + '/' + fname
  const fs = require('fs')
  fs.rename(req.file.path, des)
  // HTMLを出力
  res.send('ファイルを受信しました<br/>' +
      `<img src="/pub/${fname}" />`)
})
