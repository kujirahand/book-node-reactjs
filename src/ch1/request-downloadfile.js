// モジュールを取り込む
const fs = require('fs')
const request = require('request')

// requestモジュールを使ってファイルをダウンロード
request('http://uta.pw/shodou/img/28/214.png')
  .pipe(fs.createWriteStream('test.png'))
