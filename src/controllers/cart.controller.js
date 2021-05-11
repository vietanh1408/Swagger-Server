const db = require('../db')

module.exports.index = (req, res, next) => {
    const sessionId = req.signedCookies.sessionId
    res.locals.cart = db.get('sessions').find({
        id: sessionId
    }).get('cart').value()
    console.log(res.locals.cart)
    res.render('cart/index', {
        cart: res.locals.cart
    })
}

module.exports.addToCart = (req, res, next) => {
    const productId = req.params.productId
    const sessionId = req.signedCookies.sessionId
    if (!sessionId) {
        res.redirect('/')
        return
    }

    const count = db.get('sessions')
        .find({
            id: sessionId
        })
        .get('cart.' + productId, 0)
        .value()

    db.get('sessions')
        .find({
            id: sessionId
        })
        .set('cart.' + productId, count + 1)
        .write()
    res.redirect('/products')

}