const User = require('./../../models/user.model')
const ObjectId = require('mongodb').ObjectID

module.exports.index = async (req, res) => {
    const users = await User.find()
    res.json(users)
}

module.exports.information = async (req, res) => {
    const id = new ObjectId(req.params.id)

    const user = await User.findOne({ _id: id })
    res.json(user)
}
