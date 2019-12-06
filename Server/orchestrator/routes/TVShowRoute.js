const router = require('express').Router()
const TVShowController = require('../controllers/TVShowController')

router.post('/', TVShowController.create)
router.get('/', TVShowController.find)
router.patch('/:id', TVShowController.update)
router.get('/:id', TVShowController.findById)
router.delete('/:id', TVShowController.delete)

module.exports = router
