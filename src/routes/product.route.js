const express = require('express')
const route = express.Router()
const controller = require('../controllers/product.controller')

route.get('/', controller.index)

route.get('/search', controller.search)

route.get('/:id', controller.details)

module.exports = route