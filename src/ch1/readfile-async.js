const fs = require('fs')

// Promiseで非同期でファイルを読み込む関数を定義
function readFileEx (fname) {
  return new Promise((resolve, reject) => {
    fs.readFile(fname, 'utf-8', (err, data) => {
      resolve(data)
    })
  })
}

// 全てのファイルを逐次読むasync関数を定義
async function readAll () {
  const a = await readFileEx('a.txt')
  console.log(a)
  const b = await readFileEx('b.txt')
  console.log(b)
  const c = await readFileEx('c.txt')
  console.log(c)
}

readAll()

