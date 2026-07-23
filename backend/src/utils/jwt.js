const jwt = require('jsonwebtoken')

const SECRET = process.env.JWT_SECRET || 'majestique_dev_secret_change_in_prod'
const EXPIRES = process.env.JWT_EXPIRES_IN || '7d'

module.exports = {
  signToken: (payload) => jwt.sign(payload, SECRET, { expiresIn: EXPIRES }),
  verifyToken: (token) => jwt.verify(token, SECRET),
}
