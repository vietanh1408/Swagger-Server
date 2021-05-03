const db = require('../db')
const users = db.get('users').value()

module.exports.index = (req, res) => {
    res.render('users/index', { users })
}