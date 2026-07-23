const { verifyToken } = require('../utils/jwt')

// Attaches req.admin if token present, but does NOT block unauthenticated requests
module.exports = function optionalAuth(req, _res, next) {
  const header = req.headers.authorization
  if (header && header.startsWith('Bearer ')) {
    try {
      req.admin = verifyToken(header.slice(7))
    } catch {
      // Invalid token — treat as unauthenticated
    }
  }
  next()
}
