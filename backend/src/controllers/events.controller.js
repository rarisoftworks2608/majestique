const prisma = require('../config/database')

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, published, upcoming } = req.query
    const where = {}

    if (!req.admin) where.published = true
    else if (published !== undefined) where.published = published === 'true'

    if (upcoming === 'true') where.startDate = { gte: new Date() }

    const [events, total] = await Promise.all([
      prisma.event.findMany({
        where,
        orderBy: { startDate: upcoming === 'true' ? 'asc' : 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        select: {
          id: true, slug: true, title: true, description: true,
          coverImage: true, location: true, startDate: true, endDate: true, published: true,
        },
      }),
      prisma.event.count({ where }),
    ])

    res.json({ events, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) })
  } catch (err) { next(err) }
}

exports.getBySlug = async (req, res, next) => {
  try {
    const where = { slug: req.params.slug }
    if (!req.admin) where.published = true

    const event = await prisma.event.findFirst({ where })
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json({ event })
  } catch (err) { next(err) }
}

exports.getById = async (req, res, next) => {
  try {
    const event = await prisma.event.findUnique({ where: { id: req.params.id } })
    if (!event) return res.status(404).json({ error: 'Event not found' })
    res.json({ event })
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const { title, description, coverImage, location, startDate, endDate, published } = req.body
    if (!title || !startDate) return res.status(400).json({ error: 'Title and startDate are required' })

    const slug = slugify(title)
    const event = await prisma.event.create({
      data: {
        slug, title, description: description || '', coverImage, location,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        published: published || false,
      },
    })
    res.status(201).json({ event })
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body }
    if (data.startDate) data.startDate = new Date(data.startDate)
    if (data.endDate) data.endDate = new Date(data.endDate)
    if (data.title) data.slug = slugify(data.title)

    const event = await prisma.event.update({ where: { id: req.params.id }, data })
    res.json({ event })
  } catch (err) { next(err) }
}

exports.delete = async (req, res, next) => {
  try {
    await prisma.event.delete({ where: { id: req.params.id } })
    res.json({ message: 'Event deleted' })
  } catch (err) { next(err) }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now()
}
