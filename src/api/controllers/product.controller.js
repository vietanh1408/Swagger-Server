const Product = require('./../../models/product.model')

module.exports.index = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}