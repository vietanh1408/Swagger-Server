const User = require('./../../models/user.model')
const validate = require('./../validations/auth.validation')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

module.exports.register = async (req, res) => {
    // validate register
    const { error } = validate.validateRegister(req.body)
    if (error) return res.status(400).send({ error: error.details[0].message })

    // check email already exist
    const emailExist = await User.findOne({ email: req.body.email })
    if (emailExist) return res.status(400).send({
        error: 'Email đã được sử dụng'
    })

    // security password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        password: hashedPassword
    })

    try {
        const newUser = await user.save()
        res.send({ user: newUser._id })

    } catch (err) {
        res.status(400).send({
            error: "Tạo tài khoản không thành công"
        })
    }

}


module.exports.login = async (req, res, next) => {

    //validate login
    const { error } = validate.validateLogin(req.body)
    if (error) return res.status(400).send(
        {
            error: error.details[0].message
        }
    )

    // check user name valid in database
    const user = await User.find({ name: req.body.name })
    if (!user) return res.status(400).send(
        {
            error: "Tên đăng nhập không tồn tại"
        }
    )

    // check password valid
    const validPassword = bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send({
        error: "mật khẩu không đúng"
    })

    // create and assign a token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

}
