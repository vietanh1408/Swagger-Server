const express = require('express')
const route = express.Router()
const controller = require('../controllers/auth.controller')

route.get('/login', controller.login)

route.get('/register', controller.register)

route.post('/register', controller.registerCreate)

module.exports = route