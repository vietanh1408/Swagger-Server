const User = require('../models/user.model')

const validateRegister = async (req, res, next) => {

    const errors = {
        name: !req.body.name ? 'Vui lòng điền tên đăng nhập !' : '',
        email: !req.body.email ? 'Vui lòng điền email !' : '',
        phone: !req.body.phone ? 'Vui lòng điền số điện thoại !' : '',
        password: !req.body.password ? 'Vui lòng điền mật khẩu !' : '',
        confirmPassword: !req.body.confirmPassword ? 'Vui lòng nhập lại mật khẩu !' : '',
    }

    const nameRe = new RegExp(req.body.name, 'g')
    const emailRe = new RegExp(req.body.email, 'g')
    const phoneRe = new RegExp(req.body.phone, 'g')

    const userChecked = await User.findOne({
        $or: [
            { name: nameRe },
            { email: emailRe },
            { phone: phoneRe }
        ]
    })

    if (userChecked) {
        if (req.body.name === userChecked.name) errors.name = 'Tên đăng nhập đã tồn tại !'
        if (req.body.email === userChecked.email) errors.email = 'Email đã được đăng ký bới tài khoản khác !'
        if (req.body.phone === userChecked.phone) errors.phone = 'Số điện thoại đã được đăng ký bới tài khoản khác !'
    }

    if (req.body.password.length < 6) {
        errors.password = 'Mật khẩu phải có ít nhất 6 ký tự !'
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