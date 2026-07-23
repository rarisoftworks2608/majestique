module.exports = function errorHandler(err, req, res, next) {
  console.error(err)

  if (err.code === 'P2025') {
    return res.status(404).json({ error: 'Resource not found' })
  }
  if (err.code === 'P2002') {
    return res.status(409).json({ error: 'Duplicate entry — this record already exists' })
  }

  const status = err.status || err.statusCode || 500
  const message = status < 500 ? err.message : 'Internal server error'
  res.status(status).json({ error: message })
}
