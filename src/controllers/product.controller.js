const db = require('../db')
const products = db.get('products').value()
const shortid = require('shortid')

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

module.exports.create = (req, res) => {
    res.render('products/create')
}

module.exports.postCreate = (req, res) => {

    // const imagePath = path.join(__dirname, '/public/images');
    // // call class Resize
    // const fileUpload = new Resize(imagePath);
    // if (!req.file) {
    //     res.status(401).json({error: 'Please provide an image'});
    // }
    // const filename = await fileUpload.save(req.file.buffer);

    // return res.status(200).json({ name: filename });
}