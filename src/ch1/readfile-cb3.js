const fs = require('fs')
// (1) a.txt の読み込み
fs.readFile('a.txt', 'utf-8', function (err, data) {
  console.log('a.txtを読みました', data)
  // (2) b.txt の読み込み
  fs.readFile('b.txt', 'utf-8', function (err, data) {
    console.log('b.txtを読みました', data)
    // (3) c.txt の読み込み
    fs.readFile('c.txt', 'utf-8', function (err, data) {
      console.log('c.txtを読みました', data)
    })
  })
})
