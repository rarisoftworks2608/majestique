const router       = require('express').Router()
const auth         = require('../middleware/auth')
const optionalAuth = require('../middleware/optionalAuth')
const c            = require('../controllers/projects.controller')

// Public (admin sees drafts via optionalAuth)
router.get('/',          optionalAuth, c.getAll)
router.get('/admin/:id', auth,         c.getById)   // must be before /:slug
router.get('/:slug',     optionalAuth, c.getBySlug)

// Protected
router.post('/',    auth, c.create)
router.put('/:id',  auth, c.update)
router.delete('/:id', auth, c.delete)

// Images
router.post('/:id/images',            auth, c.addImage)
router.delete('/:id/images/:imgId',   auth, c.deleteImage)

// Plans (renamed from floor-plans)
router.post('/:id/plans',             auth, c.addPlan)
router.delete('/:id/plans/:planId',   auth, c.deletePlan)

module.exports = router
