const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
db.defaults({ products: [], users: [] })
    .write()
const products = db.get('products').value()
const users = db.get('users').value()

module.exports.products = products

module.exports.users = users