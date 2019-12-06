const { verify } = require('../helpers/jwt')
const Collection = require('../models/Collections')

module.exports = {

    authentication(req, res, next) {
        try {
            req.decode = verify(req.headers.token)
            next()
        } catch (err) {
            next({
                status: 400,
                msg: 'please login first'
            })
        }
    },

    authorization: (req, res, next) => {
        let { id }= req.params
        let userId = req.decode.id

        Collection.findById(id)
            .then(collection => {
                if (!collection) {
                    next({
                        status: 404,
                        msg: 'Collection is Not Found'
                    })
                }
                else if (collection.userId != userId) {
                    next({
                        status: 403,
                        msg: 'Not Authorized'
                    })
                }
                else {
                    next()
                }
            })
            .catch(next)
        }
}