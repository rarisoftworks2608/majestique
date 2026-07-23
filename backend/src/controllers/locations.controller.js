const prisma = require('../config/database')

// GET /locations
exports.getAll = async (req, res, next) => {
  try {
    const locations = await prisma.location.findMany({
      where:   { active: true },
      include: { _count: { select: { projects: { where: { published: true } } } } },
      orderBy: { name: 'asc' },
    })
    res.json({ locations })
  } catch (err) {
    next(err)
  }
}

// GET /locations/:slug  — includes published projects for that location
exports.getBySlug = async (req, res, next) => {
  try {
    const location = await prisma.location.findUnique({
      where:   { slug: req.params.slug },
      include: {
        projects: {
          where:   { published: true },
          include: { images: { take: 1, orderBy: { order: 'asc' } } },
          orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
        },
      },
    })
    if (!location) return res.status(404).json({ error: 'Location not found' })
    res.json({ location })
  } catch (err) {
    next(err)
  }
}

// POST /locations
exports.create = async (req, res, next) => {
  try {
    const { slug, name, city, state, description, latitude, longitude } = req.body
    if (!slug || !name) {
      return res.status(400).json({ error: 'slug and name are required' })
    }
    const location = await prisma.location.create({
      data: { slug, name, city, state, description, latitude, longitude },
    })
    res.status(201).json({ location })
  } catch (err) {
    next(err)
  }
}

// PUT /locations/:id
exports.update = async (req, res, next) => {
  try {
    const { name, city, state, description, latitude, longitude, active } = req.body
    const location = await prisma.location.update({
      where: { id: req.params.id },
      data:  { name, city, state, description, latitude, longitude, active },
    })
    res.json({ location })
  } catch (err) {
    next(err)
  }
}

// DELETE /locations/:id
exports.delete = async (req, res, next) => {
  try {
    await prisma.location.delete({ where: { id: req.params.id } })
    res.json({ message: 'Location deleted' })
  } catch (err) {
    next(err)
  }
}
