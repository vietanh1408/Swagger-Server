const express = require('express')
const route = express.Router()
const controller = require('../controllers/product.controller')

route.get('/', controller.index)

route.get('/search', controller.search)

route.get('/create', controller.create)

// route.post('/create'/* , upload.single('image') */, controller.postCreate)

route.get('/:id', controller.details)


module.exports = route