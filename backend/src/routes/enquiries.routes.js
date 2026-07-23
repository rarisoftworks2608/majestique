const router = require('express').Router()
const auth = require('../middleware/auth')
const { submit, getAll, updateStatus } = require('../controllers/enquiries.controller')

router.post('/', submit)
router.get('/', auth, getAll)
router.patch('/:id/status', auth, updateStatus)

module.exports = router
