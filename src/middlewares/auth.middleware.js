const db = require('../db')
const users = db.get('users').value()

module.exports.authMiddleware = (req, res, next) => {

    if (!req.signedCookies.userId) {
        res.redirect('/login')
        return
    }
    const user = users.find(user => user.id === req.signedCookies.userId)
    if (!user) {
        res.redirect('/login')
        return
    }
    res.locals.user = user
    next()
}