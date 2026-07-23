const router = require('express').Router()
const auth = require('../middleware/auth')
const optionalAuth = require('../middleware/optionalAuth')
const c = require('../controllers/careers.controller')

router.get('/', optionalAuth, c.getAll)
router.get('/:id', optionalAuth, c.getById)

router.post('/', auth, c.create)
router.put('/:id', auth, c.update)
router.delete('/:id', auth, c.delete)

module.exports = router
