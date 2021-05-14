require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_ONLINE,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useCreateIndex: true,
                useFindAndModify: false
            })
        console.log('mongoDB connected')
    } catch (err) {
        console.log(err)
    }
}

connectDB()

const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser')

const productRoute = require('./routes/product.route')
const authRoute = require('./routes/auth.route')
const userRoute = require('./routes/user.route')
const cartRoute = require('./routes/cart.route')

const apiProductRoute = require('./api/routes/product.route')
const apiUserRoute = require('./api/routes/user.route')
const apiAuthRoute = require('./api/routes/auth.route')

const authMiddleware = require('./middlewares/auth.middleware')
const sessionMiddleware = require('./middlewares/session.middleware')

app.set('view engine', 'pug')
app.set('views', './src/views')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(express.static('public'))
app.use(sessionMiddleware)

app.use('/api/products', apiProductRoute)
app.use('/api/users', apiUserRoute)
app.use('/api/', apiAuthRoute)

app.use('/products'/* , authMiddleware.authMiddleware */, productRoute)
app.use('/users', authMiddleware.authMiddleware, userRoute)
app.use('/cart', authMiddleware.authMiddleware, cartRoute)
app.use('', authRoute)

app.get('/', authMiddleware.authMiddleware, (req, res) => {
    res.render('index')
})

app.listen(9000, () => {
    console.log('Server start at http://localhost:9000')
})