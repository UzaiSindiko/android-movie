const router = require('express').Router()
const movieController = require('../controllers/TVShowController')

router.post('/', movieController.create)
router.get('/', movieController.find)
router.patch('/:id', movieController.update)
router.get('/:id', movieController.findById)
router.delete('/:id', movieController.delete)

module.exports =  router
