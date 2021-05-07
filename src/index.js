const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const productRoute = require('./routes/product.route')
const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const authMiddleware = require('./middlewares/auth.middleware')
var cookieParser = require('cookie-parser')
require('dotenv').config()


app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static('public'))
app.use('/products', authMiddleware.authMiddleware, productRoute)
app.use('/users', authMiddleware.authMiddleware, userRoute)
app.use('', authMiddleware.authMiddleware, authRoute)

app.get('/', authMiddleware.authMiddleware, (req, res) => {
    res.render('index')
})

app.listen(1408, (req, res) => {
    console.log('Server start at http://localhost:1408')
})