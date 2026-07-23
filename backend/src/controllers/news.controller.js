const prisma = require('../config/database')

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 12, published } = req.query
    const where = {}

    // Public callers only see published articles
    if (!req.admin) where.published = true
    else if (published !== undefined) where.published = published === 'true'

    const [articles, total] = await Promise.all([
      prisma.newsArticle.findMany({
        where,
        orderBy: { publishedAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
        select: {
          id: true, slug: true, title: true, excerpt: true,
          coverImage: true, publishedAt: true, published: true,
        },
      }),
      prisma.newsArticle.count({ where }),
    ])

    res.json({ articles, total, page: parseInt(page), pages: Math.ceil(total / parseInt(limit)) })
  } catch (err) { next(err) }
}

exports.getBySlug = async (req, res, next) => {
  try {
    const where = { slug: req.params.slug }
    if (!req.admin) where.published = true

    const article = await prisma.newsArticle.findFirst({ where })
    if (!article) return res.status(404).json({ error: 'Article not found' })
    res.json({ article })
  } catch (err) { next(err) }
}

exports.getById = async (req, res, next) => {
  try {
    const article = await prisma.newsArticle.findUnique({ where: { id: req.params.id } })
    if (!article) return res.status(404).json({ error: 'Article not found' })
    res.json({ article })
  } catch (err) { next(err) }
}

exports.create = async (req, res, next) => {
  try {
    const { title, excerpt, content, coverImage, published, publishedAt } = req.body
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' })

    const slug = slugify(title)
    const article = await prisma.newsArticle.create({
      data: { slug, title, excerpt: excerpt || '', content, coverImage, published: published || false, publishedAt: publishedAt ? new Date(publishedAt) : new Date() },
    })
    res.status(201).json({ article })
  } catch (err) { next(err) }
}

exports.update = async (req, res, next) => {
  try {
    const data = { ...req.body }
    if (data.publishedAt) data.publishedAt = new Date(data.publishedAt)
    if (data.title) data.slug = slugify(data.title)

    const article = await prisma.newsArticle.update({ where: { id: req.params.id }, data })
    res.json({ article })
  } catch (err) { next(err) }
}

exports.delete = async (req, res, next) => {
  try {
    await prisma.newsArticle.delete({ where: { id: req.params.id } })
    res.json({ message: 'Article deleted' })
  } catch (err) { next(err) }
}

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '') + '-' + Date.now()
}
