require('dotenv').config()
const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')
const errorHandler = require('./middleware/errorHandler')

const app = express()

// ─── Security & Middleware ────────────────────────────────────────────
app.use(helmet())
app.use(cors({
  origin: [
    'https://real-estate-project-ashen-two.vercel.app',
    'http://localhost:5173'
  ],
  credentials: true
}))

app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'))

// ─── Rate Limiting ────────────────────────────────────────────────────
app.use('/api', rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
}))

app.use('/api/enquiries', rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 10,
  message: { error: 'Too many enquiries submitted. Please try again later.' },
}))

// ─── Routes ───────────────────────────────────────────────────────────
app.use('/api/auth',      require('./routes/auth.routes'))
app.use('/api/projects',  require('./routes/projects.routes'))
app.use('/api/locations', require('./routes/locations.routes'))
app.use('/api/news',      require('./routes/news.routes'))
app.use('/api/events',    require('./routes/events.routes'))
app.use('/api/careers',   require('./routes/careers.routes'))
app.use('/api/enquiries', require('./routes/enquiries.routes'))
app.use('/api/upload',    require('./routes/upload.routes'))
app.use('/api/dashboard', require('./routes/dashboard.routes'))

// ─── Health Check ─────────────────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ─── 404 ──────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// ─── Error Handler ────────────────────────────────────────────────────
app.use(errorHandler)

module.exports = app
