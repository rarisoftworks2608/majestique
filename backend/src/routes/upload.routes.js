const router = require('express').Router()
const auth = require('../middleware/auth')
const { single, multiple } = require('../middleware/upload')
const { uploadSingle, uploadMultiple } = require('../controllers/upload.controller')

router.post('/', auth, single, uploadSingle)
router.post('/multiple', auth, multiple, uploadMultiple)

module.exports = router
