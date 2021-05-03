const db = require('../db')

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.register = (req, res) => {
    res.render('auth/register')
}

module.exports.registerCreate = (req, res) => {
    db.get('users').push(req.body).write()
    res.redirect('/users')
}