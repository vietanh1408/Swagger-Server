const md5 = require('md5')

const validateRegister = (req, res, next) => {
    req.body.password = md5(req.body.password)
    req.body.confirmPassword = md5(req.body.confirmPassword)
    const errors = {
        name: !req.body.name ? 'Vui lòng điền tên đăng nhập !' : '',
        email: !req.body.email ? 'Vui lòng điền email !' : '',
        phone: !req.body.phone ? 'Vui lòng điền số điện thoại !' : '',
        password: !req.body.password ? 'Vui lòng điền mật khẩu !' : '',
        confirmPassword: !req.body.confirmPassword ? 'Vui lòng nhập lại mật khẩu !' : '',
    }
    if (req.body.confirmPassword && req.body.password !== req.body.confirmPassword) {
        errors.confirmPassword = 'Mật khẩu nhập lại không khớp !'
    }
    if (errors.name || errors.email || errors.password || errors.phone || errors.confirmPassword) {
        res.render('auth/register', {
            errors,
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            password: req.body.password,
            confirmPassword: req.body.confirmPassword,
            avatar: req.body.avatar,
        })
    }
    else next()
}


module.exports = validateRegister