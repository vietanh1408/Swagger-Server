const express = require('express')
const route = express.Router()
const controller = require('../controllers/cart.controller')

route.get('/', controller.index)

route.get('/add/:productId', controller.addToCart)

module.exports = route