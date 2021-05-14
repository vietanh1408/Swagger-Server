const validateLogin = (req, res, next) => {
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

module.exports = validateLogin