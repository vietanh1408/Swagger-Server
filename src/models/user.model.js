const mongoose = require('mongoose')

// khai bao cac field co trong object
// Ex: 
// user{
//     name
//     email
//     password
//     avatar
//     phone
// }
const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
    },
    confirmPassword: {
        type: String,
    },
    avatar: {
        type: String,
    },
    versionKey: false
})

const User = mongoose.model('User', userSchema, 'users')

module.exports = User

