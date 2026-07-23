const router = require('express').Router()
const auth   = require('../middleware/auth')
const c      = require('../controllers/locations.controller')

router.get('/',     c.getAll)
router.get('/:slug', c.getBySlug)

router.post('/',    auth, c.create)
router.put('/:id',  auth, c.update)
router.delete('/:id', auth, c.delete)

module.exports = router
