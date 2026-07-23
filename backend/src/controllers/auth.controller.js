const bcrypt = require('bcryptjs')
const prisma = require('../config/database')
const { signToken } = require('../utils/jwt')

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' })
    }

    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin) return res.status(401).json({ error: 'Invalid credentials' })

    const valid = await bcrypt.compare(password, admin.password)
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' })

    const token = signToken({ id: admin.id, email: admin.email })
    res.json({
      token,
      admin: { id: admin.id, email: admin.email, name: admin.name },
    })
  } catch (err) {
    next(err)
  }
}

exports.me = async (req, res, next) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, email: true, name: true, createdAt: true },
    })
    if (!admin) return res.status(404).json({ error: 'Admin not found' })
    res.json({ admin })
  } catch (err) {
    next(err)
  }
}

exports.logout = (_req, res) => {
  res.json({ message: 'Logged out' })
}
