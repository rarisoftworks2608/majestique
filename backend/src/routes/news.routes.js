const router = require('express').Router()
const auth = require('../middleware/auth')
const optionalAuth = require('../middleware/optionalAuth')
const c = require('../controllers/news.controller')

// Public + admin can call these (optional auth controls what's visible)
router.get('/', optionalAuth, c.getAll)
router.get('/:slug', optionalAuth, c.getBySlug)

// Admin only
router.get('/admin/:id', auth, c.getById)
router.post('/', auth, c.create)
router.put('/:id', auth, c.update)
router.delete('/:id', auth, c.delete)

module.exports = router
