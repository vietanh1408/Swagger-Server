const shortId = require('shortid')
const db = require('../db')

module.exports = async (req, res, next) => {
    if (!req.signedCookies.sessionId) {
        const sessionId = shortId.generate()
        await res.cookie('sessionId', sessionId, {
            signed: true
        })

        db.get('sessions').push({
            id: sessionId
        })
            .write()

    }

    next()
}