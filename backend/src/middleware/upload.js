const multer = require('multer')
const path = require('path')

const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5 MB

// Memory storage → pass buffer to Cloudinary (or save locally in dev)
const storage = multer.memoryStorage()

const fileFilter = (_req, file, cb) => {
  if (ALLOWED_TYPES.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Only JPEG, PNG, and WebP images are allowed'), false)
  }
}

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: MAX_SIZE },
})

module.exports = {
  single: upload.single('image'),
  multiple: upload.array('images', 20),
}
