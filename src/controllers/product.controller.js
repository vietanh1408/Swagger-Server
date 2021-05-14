const Product = require('../models/product.model')

module.exports.index = async (req, res, next) => {
    const keyword = req.query.keyword
    if (!keyword) {
        const page = req.query.page || 1
        const count = await Product.countDocuments()
        const limit = 8
        const start = (page - 1) * limit
        const length = Math.ceil(count / limit)
        const products = await Product.find().skip(start).limit(limit)

        let error = ''
        if (page > length) error = 'Error 404 - Không tìm thấy trang web, Vui lòng thử lại'

        res.render('products/index', {
            q: keyword ? keyword : '',
            page: page,
            prevPage: +page - 1,
            nextPage: +page + 1,
            limit: limit,
            products: products,
            length: length,
            error: error
        })
    }
    else next()

}

module.exports.search = async (req, res) => {
    const q = req.query.keyword.toLowerCase().trim()
    const page = req.query.page || 1
    const keyword = new RegExp(q, 'g')
    const count = await Product.find({ name: keyword }).countDocuments()

    const limit = 8
    const start = (page - 1) * limit
    const length = Math.ceil(count / limit)

    const matchProducts = await Product.find({ name: keyword }).skip(start).limit(limit)

    let error = ''
    if (page > length) error = 'Error 404 - Không tìm thấy trang web, Vui lòng thử lại'

    res.render('products/index', {
        page: page,
        prevPage: +page - 1,
        nextPage: +page + 1,
        limit: limit,
        products: matchProducts,
        length: length,
        error: error,
        q: q ? q : ""
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