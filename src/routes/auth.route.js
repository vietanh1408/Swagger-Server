const express = require('express')
const route = express.Router()
const controller = require('../controllers/auth.controller')
const multer = require('multer')
const upload = multer({ dest: 'public/uploads/' })
const validateRegister = require('../validations/validate.register')
const validateLogin = require('../validations/validate.login')

route.get('/login', controller.login)

route.post('/login', validateLogin, controller.loginPost)

route.get('/register', controller.register)

route.post('/register', upload.single('avatar'), validateRegister, controller.registerCreate)

route.get('/logout', controller.logout)

module.exports = route