const db = require('../db')
// const users = db.get('users').value()
const User = require('../models/user.model')

module.exports.index = async (req, res) => {
    const users = await User.find()
    res.render('users/index', { users })
}

module.exports.search = (req, res) => {
    const name = req.query.name
    const matchUsers = users.filter(user => user.name.toLowerCase().includes(name.toLowerCase().trim()))
    res.render('users/index', {
        users: matchUsers,
        name: name.trim()
    })
}

module.exports.information = (req, res) => {
    const id = req.params.id
    const user = users.find(user => user.id === id)
    res.render('users/information', { user })
}