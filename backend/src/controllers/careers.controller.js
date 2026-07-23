const prisma = require('../config/database')

exports.getAll = async (req, res, next) => {
  try {
    const { department, type } = req.query
    const where = {}

    // Public only sees active listings
    if (!req.admin) where.active = true
    if (department) where.department = { contains: department, mode: 'insensitive' }
    if (type) where.type = { contains: type, mode: 'insensitive' }

    const jobs = await prisma.jobListing.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })
    res.json({ jobs })
  } catch (err) { next(err) }
}

exports.getById = async (req, res, next) => {
  try {
    const where = { id: req.params.id }
    if (!req.admin) where.active = true

    const job = await prisma.jobListing.findFirst({ where })
    if (!job) return res.status(404).json({ error: 'Job listing not found' })
    res.json({ job })
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const { title, department, location, type, description, requirements } = req.body
    if (!title || !department || !location || !type || !description || !requirements) {
      return res.status(400).json({ error: 'All fields are required' })
    }
    const job = await prisma.jobListing.create({
      data: { title, department, location, type, description, requirements, active: true },
    })
    res.status(201).json({ job })
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const job = await prisma.jobListing.update({
      where: { id: req.params.id },
      data: req.body,
    })
    res.json({ job })
  } catch (err) { next(err) }
}

exports.delete = async (req, res, next) => {
  try {
    await prisma.jobListing.delete({ where: { id: req.params.id } })
    res.json({ message: 'Job listing deleted' })
  } catch (err) { next(err) }
}
