const db = require('../db')
const users = db.users

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.register = (req, res) => {
    res.render('auth/register')
}

module.exports.registerCreate = (req, res) => {
    users.push(req.body)
    res.redirect('/users')
}