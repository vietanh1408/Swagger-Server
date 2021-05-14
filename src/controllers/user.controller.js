
const User = require('../models/user.model')
const ObjectId = require('mongodb').ObjectID

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
    const id = new ObjectId(req.params.id)
    const user = await User.findOne({ _id: id })
    res.render('users/information', { user })
}