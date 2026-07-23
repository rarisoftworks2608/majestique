const app = require('./app')
const prisma = require('./config/database')

const PORT = process.env.PORT || 5000

async function main() {
  await prisma.$connect()
  console.log('✓ Database connected')

  app.listen(PORT, () => {
    console.log(`✓ Server running on http://localhost:${PORT}`)
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`)
  })
}

main().catch((err) => {
  console.error('Failed to start server:', err)
  process.exit(1)
})

process.on('SIGINT', async () => {
  await prisma.$disconnect()
  process.exit(0)
})
