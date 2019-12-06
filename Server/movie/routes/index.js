const router = require('express').Router()
const movieRoute = require('./MovieRoute')

router.use('/movies', movieRoute)

module.exports = router
