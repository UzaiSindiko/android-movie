const router = require('express').Router()
const TVShowRoute = require('./TVShowRoute')
const MovieRoute = require('./MovieRoute')

router.use('/movies', MovieRoute)
router.use('/tvshows', TVShowRoute)

module.exports = router
