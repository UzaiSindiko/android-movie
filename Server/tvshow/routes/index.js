const router = require('express').Router()
const TVShowRoute = require('./TVShowRoute')

router.use('/tvshows', TVShowRoute)

module.exports = router
