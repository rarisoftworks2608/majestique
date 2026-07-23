let cloudinary = null

function getCloudinary() {
  if (cloudinary) return cloudinary

  const { CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET } = process.env

  if (!CLOUDINARY_CLOUD_NAME || !CLOUDINARY_API_KEY || !CLOUDINARY_API_SECRET) {
    return null
  }

  try {
    cloudinary = require('cloudinary').v2
    cloudinary.config({
      cloud_name: CLOUDINARY_CLOUD_NAME,
      api_key: CLOUDINARY_API_KEY,
      api_secret: CLOUDINARY_API_SECRET,
    })
    return cloudinary
  } catch {
    return null
  }
}

async function uploadBuffer(buffer, folder = 'majestique') {
  const cld = getCloudinary()
  if (!cld) throw new Error('Cloudinary is not configured. Set CLOUDINARY_* env vars.')

  return new Promise((resolve, reject) => {
    cld.uploader.upload_stream(
      { folder, resource_type: 'image', quality: 'auto', fetch_format: 'auto' },
      (err, result) => (err ? reject(err) : resolve(result))
    ).end(buffer)
  })
}

async function deleteByUrl(url) {
  const cld = getCloudinary()
  if (!cld || !url) return

  // Extract public_id from Cloudinary URL
  const match = url.match(/\/v\d+\/(.+)\.\w+$/)
  if (match) await cld.uploader.destroy(match[1])
}

module.exports = { uploadBuffer, deleteByUrl }
