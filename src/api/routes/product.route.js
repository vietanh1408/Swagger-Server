const express = require('express')
const route = express.Router()
const controller = require('../controllers/product.controller')
var multer = require('multer')
var upload = multer({ dest: 'public/uploads/' })

route.get('/', controller.index)

module.exports = route