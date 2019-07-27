// メイン処理 - 逐次ダウンロード --- (※1)
(async () => {
  const path = require('path')
  const base = 'http://yann.lecun.com/exdb/mnist'
  await download(
    base + '/t10k-images-idx3-ubyte.gz',
    path.join(__dirname, 'database', 'images-idx3'))
  await download(
    base + '/t10k-labels-idx1-ubyte.gz',
    path.join(__dirname, 'database', 'labels-idx1'))
})()

// ダウンロードと解凍を行う --- (※2)
async function download (url, savepath) {
  console.log('開始:', url)
  const tmp = savepath + '.gz'
  await downloadPromise(url, tmp)
  await gunzip(tmp, savepath)
  console.log('ok:', savepath)
}

// ファイルのダウンロードを行う関数を定義 --- (※3)
function downloadPromise (url, savepath) {
  return new Promise((resolve, reject) => {
    const http = require('http')
    const fs = require('fs')
    if (fs.existsSync(savepath)) return resolve()
    const outfile = fs.createWriteStream(savepath)
    http.get(url, (res) => {
      res.pipe(outfile)
      res.on('end', () => {
        outfile.close()
        resolve()
      })
    })
    .on('error', (err) => reject(err))
  })
}
// ファイルの解凍を行う --- (※4)
function gunzip (infile, outfile) {
  return new Promise((resolve, reject) => {
    const zlib = require('zlib')
    const fs = require('fs')
    const rd = fs.readFileSync(infile)
    zlib.gunzip(rd, (err, bin) => {
      if (err) reject(err)
      fs.writeFileSync(outfile, bin)
      resolve()
    })
  })
}
