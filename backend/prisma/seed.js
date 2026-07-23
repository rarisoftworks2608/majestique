const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  // Admin user
  const hashedPassword = await bcrypt.hash('admin@123', 12)
  await prisma.admin.upsert({
    where: { email: 'admin@majestique.com' },
    update: {},
    create: {
      email: 'admin@majestique.com',
      password: hashedPassword,
      name: 'Majestique Admin',
      role: 'SUPER_ADMIN',
    },
  })
  console.log('✓ Admin seeded: admin@majestique.com / admin@123')

  // Demo projects
  const projects = [
    {
      slug: 'majestique-empire',
      title: 'Majestique Empire',
      tagline: 'Redefining Luxury Living in the Heart of Pune',
      description: 'Majestique Empire is a landmark residential tower offering ultra-luxury 3 & 4 BHK residences with panoramic city views. Every home is crafted with imported materials, designer interiors, and world-class amenities.',
      status: 'ONGOING',
      category: 'Residential',
      address: 'Baner, Pune',
      area: '2,400 – 4,200 sq.ft.',
      units: 240,
      possession: 'December 2026',
      rera: 'P52100047891',
      configurations: ['3 BHK', '4 BHK'],
      amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Security', 'Parking', 'Garden', 'Kids Play Area', 'Jogging Track'],
      highlights: ['Sky Lounge on 32nd Floor', 'Private Terrace Options', 'Smart Home Automation', 'EV Charging Stations'],
      featured: true,
      published: true,
      order: 1,
    },
    {
      slug: 'majestique-signature',
      title: 'Majestique Signature',
      tagline: 'A Signature of Prestige',
      description: 'Majestique Signature epitomizes sophisticated urban living with meticulously designed 2 & 3 BHK homes featuring contemporary architecture and premium finishes.',
      status: 'ONGOING',
      category: 'Residential',
      address: 'Wakad, Pune',
      area: '1,050 – 1,850 sq.ft.',
      units: 180,
      possession: 'March 2026',
      rera: 'P52100039821',
      configurations: ['2 BHK', '3 BHK'],
      amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Security', 'Parking', 'Garden'],
      highlights: ['Double-height Lobby', 'Imported Marble Flooring', 'Modular Kitchen', 'CCTV Surveillance'],
      featured: true,
      published: true,
      order: 2,
    },
    {
      slug: 'majestique-pinnacle',
      title: 'Majestique Pinnacle',
      tagline: 'Where Excellence Meets Elevation',
      description: 'A completed masterpiece of architectural excellence, Majestique Pinnacle stands as a testament to our commitment to quality and luxury.',
      status: 'COMPLETED',
      category: 'Residential',
      address: 'Aundh, Pune',
      area: '1,200 – 2,800 sq.ft.',
      units: 156,
      possession: 'Possession Given',
      configurations: ['2 BHK', '3 BHK', '4 BHK'],
      amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Security', 'Parking'],
      highlights: ['IGBC Pre-Certified Green Building', 'Rainwater Harvesting', 'Solar Panels'],
      featured: false,
      published: true,
      order: 3,
    },
  ]

  for (const proj of projects) {
    await prisma.project.upsert({
      where: { slug: proj.slug },
      update: {},
      create: proj,
    })
  }
  console.log('✓ Demo projects seeded')

  // Demo news articles
  const newsItems = [
    {
      slug: 'majestique-wins-realty-excellence-award-2024',
      title: 'Majestique Wins Realty Excellence Award 2024',
      excerpt: 'Majestique Landmarks has been honored with the prestigious Realty Excellence Award for outstanding contribution to luxury residential development in Pune.',
      content: '<p>We are thrilled to announce that Majestique Landmarks has been bestowed with the Realty Excellence Award 2024, recognizing our commitment to quality construction, timely delivery, and customer satisfaction.</p>',
      published: true,
      publishedAt: new Date('2024-03-15'),
    },
    {
      slug: 'majestique-empire-rera-registration-approved',
      title: 'Majestique Empire RERA Registration Approved',
      excerpt: 'Majestique Empire has received its RERA registration, marking a significant milestone in our flagship ongoing project in Baner, Pune.',
      content: '<p>Majestique Empire has successfully obtained RERA registration (P52100047891), ensuring complete transparency and legal compliance for our valued buyers.</p>',
      published: true,
      publishedAt: new Date('2024-06-20'),
    },
    {
      slug: 'sustainable-luxury-our-green-building-commitment',
      title: 'Sustainable Luxury: Our Green Building Commitment',
      excerpt: 'Majestique Landmarks commits to IGBC-certified green construction across all upcoming projects.',
      content: '<p>At Majestique Landmarks, we believe that luxury and sustainability are not opposing forces. Our upcoming projects will incorporate rainwater harvesting, solar energy systems, and EV charging infrastructure as standard features.</p>',
      published: true,
      publishedAt: new Date('2024-09-10'),
    },
  ]

  for (const article of newsItems) {
    await prisma.newsArticle.upsert({
      where: { slug: article.slug },
      update: {},
      create: article,
    })
  }
  console.log('✓ Demo news seeded')

  // Demo events
  const events = [
    {
      slug: 'majestique-empire-grand-launch-2025',
      title: 'Majestique Empire — Grand Launch',
      description: '<p>Join us for the grand launch of Majestique Empire, Pune\'s most anticipated luxury residential project.</p>',
      location: 'Hotel Marriott, Baner, Pune',
      startDate: new Date('2025-02-15T10:00:00'),
      endDate: new Date('2025-02-15T18:00:00'),
      published: true,
    },
    {
      slug: 'home-buying-masterclass-2025',
      title: 'Home Buying Masterclass',
      description: '<p>A free educational session for prospective homebuyers covering legal due diligence, RERA guidelines, and home loans.</p>',
      location: 'Majestique House, Baner Road, Pune',
      startDate: new Date('2025-03-22T11:00:00'),
      endDate: new Date('2025-03-22T14:00:00'),
      published: true,
    },
  ]

  for (const event of events) {
    await prisma.event.upsert({
      where: { slug: event.slug },
      update: {},
      create: event,
    })
  }
  console.log('✓ Demo events seeded')

  // Demo jobs
  const jobs = [
    {
      title: 'Senior Sales Manager',
      department: 'Sales',
      location: 'Pune, Maharashtra',
      type: 'Full-time',
      description: '<p>Lead our luxury residential sales team and drive revenue growth.</p>',
      requirements: '<ul><li>5+ years in premium real estate sales</li><li>Strong Pune HNI network</li></ul>',
      active: true,
    },
    {
      title: 'Architect — Design Lead',
      department: 'Design & Engineering',
      location: 'Pune, Maharashtra',
      type: 'Full-time',
      description: '<p>Shape the future skyline of Pune as our Design Lead.</p>',
      requirements: '<ul><li>B.Arch / M.Arch with 7+ years experience</li><li>Proficiency in AutoCAD, Revit, SketchUp</li></ul>',
      active: true,
    },
    {
      title: 'Digital Marketing Executive',
      department: 'Marketing',
      location: 'Pune, Maharashtra',
      type: 'Full-time',
      description: '<p>Drive our digital presence across social media, SEO, and paid advertising.</p>',
      requirements: '<ul><li>2-4 years in digital marketing</li><li>Meta Ads, Google Ads, SEO expertise</li></ul>',
      active: true,
    },
  ]

  for (const job of jobs) {
    await prisma.jobListing.create({ data: job }).catch(() => {})
  }
  console.log('✓ Demo jobs seeded')
}

main()
  .catch((e) => { console.error(e); process.exit(1) })
  .finally(() => prisma.$disconnect())
