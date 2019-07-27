const fs = require('fs')
const path = require('path')
const svm = require('node-svm')

// 学習済みデータを読み込む --- (※1)
const json = fs.readFileSync(
  path.join(__dirname, 'database', 'image-model.svm'),
  'utf-8')
const model = JSON.parse(json)
const clf = svm.restore(model)

// テストデータを読み込む --- (※2)
const testData = loadCSV('image-test.csv')
// 毎行データをテストしてエラー率を調べる --- (※3)
let count = 0
let ng = 0
testData.forEach(ex => {
  const x = ex[0]
  const label = ex[1]
  const pre = clf.predictSync(x)
  if (label !== pre) {
    ng++
    console.log('ng=', label, pre)
  }
  count++
})
console.log('エラー率=', (ng / count) * 100)

// CSVファイルを読み込む --- (※4)
function loadCSV (fname) {
  const csv = fs.readFileSync(fname, 'utf-8')
  const lines = csv.split('\n')
  const data = lines.map(line => {
    const cells = line.split(',')
    const x = cells.map(v => parseInt(v))
    const label = x.shift()
    return [x, label]
  })
  return data
}
