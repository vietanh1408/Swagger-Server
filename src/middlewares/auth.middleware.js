const db = require('../db')
const users = db.get('users').value()

module.exports.authMiddleware = (req, res, next) => {
    if (!req.cookies.userId) {
        res.redirect('/login')
        return
    }
    const user = users.find(user => user.id === req.cookies.userId)
    if (!user) {
        res.redirect('/login')
        return
    }
    next()
}