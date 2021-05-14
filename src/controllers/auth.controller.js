const md5 = require('md5')
const User = require('../models/user.model')

// REGISTER

module.exports.register = (req, res) => {
    res.render('auth/register')
}

module.exports.registerCreate = async (req, res) => {
    req.body.password = md5(req.body.password)
    req.body.confirmPassword = md5(req.body.confirmPassword)
    const file = req.file ? req.file.path.split('\\').slice(1).join('\\') : ''
    req.body.avatar = file

    try {
        const user = await User.create(req.body)
        res.cookie('userId', user._id, { signed: true })
        res.redirect('/users')
    } catch (err) {
        console.log(err)
    }

}

// LOGIN

module.exports.login = (req, res) => {
    res.render('auth/login')
}

module.exports.loginPost = async (req, res) => {
    const userName = req.body.name
    const password = md5(req.body.password)
    const user = await User.findOne({ name: userName })

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

// LOGOUT
module.exports.logout = async (req, res, next) => {
    if (req.signedCookies.userId) {
        await res.clearCookie('userId')
        res.redirect('/login')
    }
}
