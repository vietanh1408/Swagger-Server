const db = require('../db')
const shortid = require('shortid');

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.register = (req, res) => {
    res.render('auth/register')
}

module.exports.registerCreate = (req, res) => {
    req.body.id = shortid.generate()
    db.get('users').push(req.body).write()
    res.redirect('/users')
}