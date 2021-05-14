const User = require('./../../models/user.model')

module.exports.index = async (req, res) => {
    const users = await User.find()
    res.json(users)
}
