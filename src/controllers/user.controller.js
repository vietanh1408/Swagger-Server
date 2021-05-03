const db = require('../db')
const users = db.get('users').value()


module.exports.index = (req, res) => {
    res.render('users/index', { users })
}

module.exports.search = (req, res) => {
    const q = req.query.name
    const matchUsers = users.filter(user => user.name.toLowerCase().includes(q.toLowerCase().trim()))
    res.render('users/index', {
        users: matchUsers,
        q: q.trim()
    })
}

module.exports.information = (req, res) => {
    const id = req.params.id
    const user = users.find(user => user.id === id)
    res.render('users/information', { user })
}