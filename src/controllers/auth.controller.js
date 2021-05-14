const md5 = require('md5')
const User = require('../models/user.model')

// REGISTER

module.exports.register = (req, res) => {
    res.render('auth/register')
}

module.exports.registerCreate = async (req, res) => {
    const file = req.file ? req.file.path.split('\\').slice(1).join('\\') : ''
    req.body.avatar = file

    const user = new User(req.body)

    try {
        User.insertMany(user)

        const currentUser = await User.findOne({ _id: user._id })
        res.cookie('userId', currentUser.id, { signed: true })
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
