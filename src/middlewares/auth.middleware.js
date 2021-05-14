const User = require('../models/user.model')
const ObjectId = require('mongodb').ObjectID;

module.exports.authMiddleware = async (req, res, next) => {

    if (!req.signedCookies.userId) {
        res.redirect('/login')
    }
    const id = new ObjectId(req.signedCookies.userId)
    const user = await User.findOne({ _id: id })
    if (!user) {
        res.redirect('/login')
        return
    }
    res.locals.user = user
    next()
}