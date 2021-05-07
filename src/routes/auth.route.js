const express = require('express')
const route = express.Router()
const controller = require('../controllers/auth.controller')
var multer = require('multer')
var upload = multer({ dest: 'public/uploads/' })

route.get('/login', controller.login)

route.post('/login', controller.validate, controller.loginPost)

route.get('/register', controller.register)

route.post('/register', upload.single('avatar'), controller.registerCreate)

module.exports = route