const express = require('express')
const route = express.Router()
const controller = require('../controllers/auth.controller')
var multer = require('multer')
const validateRegister = require('../../validations/validate.register')
var upload = multer({ dest: 'public/uploads/' })

// route.post('/register', upload.single('avatar'), validateRegister, controller.register)

route.post('/register', controller.register)

route.post('/login', controller.login)

module.exports = route