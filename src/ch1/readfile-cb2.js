const fs = require('fs')

fs.readFile('kakugen.txt', 'utf-8', (err, data) => {
  console.log(data)
})
