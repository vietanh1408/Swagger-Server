const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const productRoute = require('./routes/product.route')
const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const cartRoute = require('./routes/cart.route')

const authMiddleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

const cookieParser = require('cookie-parser')
require('dotenv').config()

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static('public'))
app.use(sessionMiddleware)

app.use('/products', /* authMiddleware.authMiddleware, */ productRoute)
app.use('/users', authMiddleware.authMiddleware, userRoute)
app.use('/cart', cartRoute)
app.use('', /* authMiddleware.authMiddleware, */ authRoute)

app.get('/', /* authMiddleware.authMiddleware, */(req, res) => {
    res.render('index')
})

app.listen(9000, (req, res) => {
    console.log('Server start at http://localhost:9000')
})