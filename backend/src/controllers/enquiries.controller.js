const prisma = require('../config/database')

exports.submit = async (req, res, next) => {
  try {
    const { name, email, phone, subject, message, projectId } = req.body
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' })
    }
    const enquiry = await prisma.enquiry.create({
      data: { name, email, phone, subject, message, projectId },
    })
    res.status(201).json({ enquiry, message: 'Enquiry submitted successfully' })
  } catch (err) {
    next(err)
  }
}

exports.getAll = async (req, res, next) => {
  try {
    const { status, page = 1, limit = 20 } = req.query
    const where = status ? { status } : {}
    const [enquiries, total] = await Promise.all([
      prisma.enquiry.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        skip: (parseInt(page) - 1) * parseInt(limit),
        take: parseInt(limit),
      }),
      prisma.enquiry.count({ where }),
    ])
    res.json({ enquiries, total, page: parseInt(page) })
  } catch (err) {
    next(err)
  }
}

exports.updateStatus = async (req, res, next) => {
  try {
    const enquiry = await prisma.enquiry.update({
      where: { id: req.params.id },
      data: { status: req.body.status },
    })
    res.json({ enquiry })
  } catch (err) {
    next(err)
  }
}
