const User = require('../models/user.model')

module.exports.authMiddleware = (req, res, next) => {

    if (!req.signedCookies.userId) {
        res.redirect('/login')
        return
    }
    const user = User.findOne({ _id: req.signedCookies.userId })
    if (!user) {
        res.redirect('/login')
        return
    }
    res.locals.user = user
    next()
}