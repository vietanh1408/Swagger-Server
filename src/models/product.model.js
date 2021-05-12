const mongoose = require('mongoose')

const productSize = new mongoose.Schema({
    options: {
        type: Number
    }
})

const productPoster = new mongoose.Schema({
    url: {
        type: String,
    },
    id: {
        type: String,
    },
})

const productSchema = new mongoose.Schema({
    size: {
        type: [productSize]
    },
    poster: {
        type: [productPoster]
    },
    name: {
        type: String,
    },
    price: {
        type: Number
    },
    numReviews: {
        type: Number
    },
    rating: {
        type: Number
    },
    sex: {
        type: String
    },
    color: {
        type: String
    },
    collections: {
        type: String
    },
    description: {
        type: String
    },
    key: {
        type: String
    },
    NSX: {
        type: String
    },
    createAt: {
        type: String
    },
})

const Product = mongoose.model('Product', productSchema, 'products')

module.exports = Product
