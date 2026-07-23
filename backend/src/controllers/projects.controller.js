const prisma = require('../config/database')

const projectInclude = {
  images: { orderBy: { order: 'asc' } },
  plans:  { orderBy: { order: 'asc' } },
  location: { select: { id: true, name: true, slug: true, city: true } },
}

// Fields the client is allowed to write on Project
const WRITABLE_FIELDS = [
  'slug', 'title', 'tagline', 'description', 'status', 'category',
  'featured', 'order', 'locationId', 'address', 'area', 'units',
  'possession', 'rera', 'priceMin', 'priceMax', 'configurations',
  'amenities', 'highlights', 'youtubeUrl', 'coverImage', 'published',
]

function pick(body) {
  const data = Object.fromEntries(
    Object.entries(body).filter(([k]) => WRITABLE_FIELDS.includes(k))
  )
  if (data.published === true && !data.publishedAt) {
    data.publishedAt = new Date()
  }
  return data
}

// GET /projects  — public: published only; admin: all (via optionalAuth)
exports.getAll = async (req, res, next) => {
  try {
    const { status, featured, limit, locationSlug } = req.query
    const where = {}

    if (status)               where.status   = status.toUpperCase()
    if (featured === 'true')  where.featured  = true
    if (locationSlug)         where.location  = { slug: locationSlug }
    if (!req.admin)           where.published = true

    const projects = await prisma.project.findMany({
      where,
      include: {
        images:   { take: 1, orderBy: { order: 'asc' } },
        location: { select: { name: true, slug: true } },
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'desc' }],
      take: limit ? parseInt(limit, 10) : undefined,
    })
    res.json({ projects })
  } catch (err) {
    next(err)
  }
}

// GET /projects/admin/:id  (auth required — returns unpublished)
exports.getById = async (req, res, next) => {
  try {
    const project = await prisma.project.findUnique({
      where: { id: req.params.id },
      include: projectInclude,
    })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ project })
  } catch (err) {
    next(err)
  }
}

// GET /projects/:slug
exports.getBySlug = async (req, res, next) => {
  try {
    const where = { slug: req.params.slug }
    if (!req.admin) where.published = true

    const project = await prisma.project.findFirst({ where, include: projectInclude })
    if (!project) return res.status(404).json({ error: 'Project not found' })
    res.json({ project })
  } catch (err) {
    next(err)
  }
}

// POST /projects
exports.create = async (req, res, next) => {
  try {
    const data = pick(req.body)
    if (!data.title || !data.slug || !data.description) {
      return res.status(400).json({ error: 'title, slug, and description are required' })
    }
    const project = await prisma.project.create({ data, include: projectInclude })
    res.status(201).json({ project })
  } catch (err) {
    next(err)
  }
}

// PUT /projects/:id
exports.update = async (req, res, next) => {
  try {
    const project = await prisma.project.update({
      where: { id: req.params.id },
      data:  pick(req.body),
      include: projectInclude,
    })
    res.json({ project })
  } catch (err) {
    next(err)
  }
}

// DELETE /projects/:id
exports.delete = async (req, res, next) => {
  try {
    await prisma.project.delete({ where: { id: req.params.id } })
    res.json({ message: 'Project deleted' })
  } catch (err) {
    next(err)
  }
}

// POST /projects/:id/images
exports.addImage = async (req, res, next) => {
  try {
    const { url, caption, type, altText, order } = req.body
    if (!url) return res.status(400).json({ error: 'url is required' })
    const image = await prisma.projectImage.create({
      data: {
        url,
        caption,
        type:      type    || 'GALLERY',
        altText,
        order:     order   ?? 0,
        projectId: req.params.id,
      },
    })
    res.status(201).json({ image })
  } catch (err) {
    next(err)
  }
}

// DELETE /projects/:id/images/:imgId
exports.deleteImage = async (req, res, next) => {
  try {
    await prisma.projectImage.delete({ where: { id: req.params.imgId } })
    res.json({ message: 'Image deleted' })
  } catch (err) {
    next(err)
  }
}

// POST /projects/:id/plans
exports.addPlan = async (req, res, next) => {
  try {
    const { label, imageUrl, type, area, bedrooms, bathrooms, price, order } = req.body
    if (!label || !imageUrl) {
      return res.status(400).json({ error: 'label and imageUrl are required' })
    }
    const plan = await prisma.projectPlan.create({
      data: {
        label,
        imageUrl,
        type:      type      || 'FLOOR_PLAN',
        area,
        bedrooms:  bedrooms  != null ? parseInt(bedrooms,  10) : undefined,
        bathrooms: bathrooms != null ? parseInt(bathrooms, 10) : undefined,
        price,
        order:     order     ?? 0,
        projectId: req.params.id,
      },
    })
    res.status(201).json({ plan })
  } catch (err) {
    next(err)
  }
}

// DELETE /projects/:id/plans/:planId
exports.deletePlan = async (req, res, next) => {
  try {
    await prisma.projectPlan.delete({ where: { id: req.params.planId } })
    res.json({ message: 'Plan deleted' })
  } catch (err) {
    next(err)
  }
}
