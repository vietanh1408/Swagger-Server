const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const productRoute = require('./routes/product.route')
const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(express.static('public'))

app.use('/products', productRoute)
app.use('/users', userRoute)
app.use('', authRoute)

app.get('/', (req, res) => {
    res.render('index')
})

app.listen(1408, (req, res) => {
    console.log('Server start at http://localhost:1408')
})