const db = require('../db')
const users = db.get('users').value()


module.exports.index = (req, res) => {
    res.render('users/index', { users })
}

module.exports.information = (req, res) => {
    const id = req.params.id
    console.log(id)
    const user = users.find(user => user.id === id)
    res.render('users/information', { user })
}