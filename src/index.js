const express = require('express')
const app = express()
const productRoute = require('./routes/product.route')

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(express.static('public'))

app.use('/products', productRoute)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(1408, (req, res) => {
    console.log('Server start at http://localhost:1408')
})