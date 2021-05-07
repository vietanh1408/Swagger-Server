const db = require('../db')
const products = db.get('products').value()
const shortid = require('shortid')

module.exports.index = (req, res) => {

    const page = req.query.page || 1
    const limit = 8

    const start = (page - 1) * limit
    const end = page * limit

    const length = Math.ceil(products.length / 8)

    const x = []

    for (var i = 1; i <= length; i++) {
        x.push(i)
    }
    let error = ''
    if (page > length) error = 'Error 404 - Không tìm thấy trang web, Vui lòng thử lại'

    res.render('products/index', {
        page: page,
        limit: limit,
        products: products.slice(start, end),
        length: x,
        error: error
    })
}

module.exports.search = (req, res) => {
    const q = req.query.keyword
    const matchProducts = products.filter(product => product.name.toLowerCase().includes(q.toLowerCase().trim()))
    res.render('products/index', {
        products: matchProducts,
        q: q.trim()
    })

    res.locals.product = matchProducts
    // console.log(res.locals.product)

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
    if (errors.name || errors.price || errors.image || errors.description) {
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

module.exports.postCreate = (req, res, next) => {
    req.body.id = shortid.generate()

    req.body.poster = [{ url: '' }, { url: '' }]
    req.body.poster[0].url = req.body.image

    // console.log(req.body.poster[0].url)

    db.get('products').unshift(req.body).write()
    res.redirect('/products')
}