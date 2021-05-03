const db = require('../db')
const products = db.get('products').value()
module.exports.index = (req, res) => {
    res.render('products/index', { products })
}

module.exports.search = (req, res) => {
    const q = req.query.keyword
    const matchProducts = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase().trim()))
    res.render('products/index', {
        products: matchProducts,
        q: q.trim()
    })
}

module.exports.details = (req, res) => {
    const id = req.params.id
    const product = products.find(product => product.name === id)
    res.render('products/details', {
        product: product
    })
}