const Product = require('../models/product.model')

module.exports.index = async (req, res) => {

    const products = await Product.find()

    const page = req.query.page || 1
    const limit = 8

    const start = (page - 1) * limit
    const end = page * limit
    const length = Math.ceil(products.length / 8)

    let error = ''
    if (page > length) error = 'Error 404 - Không tìm thấy trang web, Vui lòng thử lại'

    res.render('products/index', {
        page: page,
        prevPage: +page - 1,
        nextPage: +page + 1,
        limit: limit,
        products: products.slice(start, end),
        length: length,
        error: error
    })
}

module.exports.search = async (req, res) => {
    const q = req.query.keyword
    const regex = new RegExp(q.toLowerCase().trim(), 'g')
    const matchProducts = await Product.find({ name: regex })

    const page = req.query.page || 1
    const limit = 8

    const start = (page - 1) * limit
    const end = page * limit
    const length = Math.ceil(matchProducts.length / 8)

    let error = ''
    if (page > length) error = 'Error 404 - Không tìm thấy trang web, Vui lòng thử lại'

    res.render('products/index', {
        page: page,
        prevPage: +page - 1,
        nextPage: +page + 1,
        limit: limit,
        products: matchProducts.slice(start, end),
        length: length,
        error: error,
        q: q.trim()
    })

    res.locals.product = matchProducts
}

module.exports.details = async (req, res) => {
    const id = req.params.id
    const product = await Product.findOne({ name: id })
    res.render('products/details', {
        product: product
    })
}

module.exports.create = (req, res) => {
    res.render('products/create')
}

module.exports.validateCreatePro = (req, res, next) => {
    const file = req.file ? req.file.path.split('\\').slice(1).join('\\') : null
    req.body.image = file
    const name = req.body.name
    const price = req.body.price
    const image = req.body.image
    const description = req.body.description
    const errors = { name: '', price: null, image: '', description: '' }
    if (!name) errors.name = 'Vui lòng điền tên sản phẩm'
    if (!price) errors.price = 'Vui lòng điền giá sản phẩm'
    if (!image) errors.image = 'Vui lòng thêm ảnh của sản phẩm'
    if (!description) errors.description = 'Vui lòng điền mô tả thông tin sản phẩm'
    if (!errors.name || !errors.price || !errors.image || !errors.description) {
        res.render('products/create', {
            errors: errors,
            name: name,
            price: price,
            image: image,
            description: description
        })
        return
    }

    next()
}

module.exports.postCreate = (req, res) => {
    req.body.id = shortid.generate()
    console.log(req.body)
}