const db = require('../db')
const shortid = require('shortid')
const users = db.get('users').value()
const md5 = require('md5')

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.register = (req, res) => {
    res.render('auth/register')
}

module.exports.registerCreate = (req, res) => {

    const file = req.file.path.split('\\').slice(1).join('\\')
    req.body.avatar = file
    req.body.id = shortid.generate()
    req.body.password = md5(req.body.password)
    db.get('users').push(req.body).write()
    res.cookie('userId', req.body.id, { signed: true })
    res.redirect('/users')
}

module.exports.validate = (req, res, next) => {
    const errors = {
        name: '',
        password: ''
    }
    if (!req.body.name) {
        errors.name = 'Vui lòng điền tên đăng nhập !'
    }
    if (!req.body.password) {
        errors.password = 'Vui lòng điền mật khẩu !'
    }
    if (errors.name || errors.password) {
        res.render('auth/login', {
            errors,
            name: req.body.name,
            password: req.body.password
        })
    }
    if (!errors.name && !errors.password) next()
}

module.exports.loginPost = (req, res) => {
    const userName = req.body.name
    const password = md5(req.body.password)
    const user = users.find(user => user.name === userName)

    if (!user) {
        res.render('auth/login', {
            errors: {
                name: 'Nguời dùng không tồn tại !',
            },
            name: req.body.name,
            password: req.body.password
        })
        return
    }
    if (user.password !== password) {
        res.render('auth/login', {
            errors: {
                password: 'Mật khẩu không đúng !',
            },
            name: req.body.name,
            password: req.body.password
        })
        return
    }
    res.cookie('userId', user.id, { signed: true })
    res.redirect('/')
}