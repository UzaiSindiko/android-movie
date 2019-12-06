const router = require('express').Router()
const MovieController = require('../controllers/MovieController')

router.post('/', MovieController.create)
router.get('/', MovieController.find)
router.patch('/:id', MovieController.update)
router.get('/:id', MovieController.findById)
router.delete('/:id', MovieController.delete)

module.exports = router
