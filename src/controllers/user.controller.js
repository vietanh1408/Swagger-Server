const db = require('../db')
const users = db.users

module.exports.index = (req, res) => {
    res.render('users/index', { users })
}