const express = require('express')
const route = express.Router()
const controller = require('../controllers/auth.controller')
var multer = require('multer')
const validateRegister = require('../../validations/validate.register')
var upload = multer({ dest: 'public/uploads/' })

route.post('/register', upload.single('avatar'), validateRegister, controller.register)

module.exports = route