const prisma = require('../config/database')

exports.getStats = async (_req, res, next) => {
  try {
    const [
      totalProjects,
      ongoingProjects,
      completedProjects,
      totalNews,
      totalEvents,
      totalJobs,
      totalEnquiries,
      newEnquiries,
      recentEnquiries,
      recentProjects,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.project.count({ where: { status: 'ONGOING' } }),
      prisma.project.count({ where: { status: 'COMPLETED' } }),
      prisma.newsArticle.count(),
      prisma.event.count(),
      prisma.jobListing.count({ where: { active: true } }),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: 'NEW' } }),
      prisma.enquiry.findMany({
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, name: true, email: true, subject: true, status: true, createdAt: true },
      }),
      prisma.project.findMany({
        orderBy: { createdAt: 'desc' },
        take: 4,
        select: { id: true, slug: true, title: true, status: true, location: true, createdAt: true },
      }),
    ])

    res.json({
      stats: {
        projects: { total: totalProjects, ongoing: ongoingProjects, completed: completedProjects },
        news: totalNews,
        events: totalEvents,
        jobs: totalJobs,
        enquiries: { total: totalEnquiries, new: newEnquiries },
      },
      recentEnquiries,
      recentProjects,
    })
  } catch (err) { next(err) }
}
