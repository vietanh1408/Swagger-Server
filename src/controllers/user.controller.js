
const User = require('../models/user.model')

module.exports.index = async (req, res) => {
    const users = await User.find()
    res.render('users/index', { users })
}

module.exports.search = async (req, res) => {
    const name = req.query.name.toLowerCase().trim()
    const regex = new RegExp(name, 'g')
    const matchUsers = await User.find({ name: regex })
    res.render('users/index', {
        users: matchUsers,
        name: name
    })
}

module.exports.information = async (req, res) => {
    const id = req.params.id
    const user = await User.find({ id: id })
    res.render('users/information', { user })
}