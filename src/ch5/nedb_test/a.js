const Datastore = require('nedb')
const db = new Datastore({
  filename: 'test.db',
  autoload: true
})
db.loadDatabase((err) => {
  // const doc = { name: 'Taro', age: 30 }
  // db.insert(doc)
  //db.update({name: 'Taro'}, {age: 25}, {}, (err, num) => {
  //  console.log(err, num)
  //})
  db.find({name: 'Taro'}, (err, docs) => {
    console.log(docs)
  })
})

