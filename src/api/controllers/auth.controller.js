const User = require('./../../models/user.model')
const md5 = require('md5')

module.exports.register = async (req, res) => {
    req.body.password = md5(req.body.password)
    req.body.confirmPassword = md5(req.body.confirmPassword)
    const file = req.file ? req.file.path.split('\\').slice(1).join('\\') : ''
    req.body.avatar = file
    try {
        const user = await User.create(req.body)
        // res.cookie('userId', user._id, { signed: true })
        // res.redirect('/users')
        res.json(user)
    } catch (err) {
        console.log(err)
    }

}
