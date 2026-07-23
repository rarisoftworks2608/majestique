const { uploadBuffer } = require('../config/cloudinary')

exports.uploadSingle = async (req, res, next) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' })

    const folder = req.query.folder || 'majestique'
    const result = await uploadBuffer(req.file.buffer, folder)

    res.json({
      url: result.secure_url,
      publicId: result.public_id,
      width: result.width,
      height: result.height,
    })
  } catch (err) {
    next(err)
  }
}

exports.uploadMultiple = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' })
    }

    const folder = req.query.folder || 'majestique'
    const uploads = await Promise.all(
      req.files.map((f) => uploadBuffer(f.buffer, folder))
    )

    res.json({
      images: uploads.map((r) => ({
        url: r.secure_url,
        publicId: r.public_id,
        width: r.width,
        height: r.height,
      })),
    })
  } catch (err) {
    next(err)
  }
}
