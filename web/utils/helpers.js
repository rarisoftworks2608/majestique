export const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(dateString))
}

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

export const truncate = (text, maxLength = 150) => {
  if (!text || text.length <= maxLength) return text
  return text.slice(0, maxLength).trimEnd() + '…'
}

export const formatPrice = (price) => {
  if (!price) return 'Price on Request'
  return `₹ ${price}`
}

// Converts Google Drive share links to embeddable image URLs
function normalizeDriveUrl(url) {
  const match = url.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/)
  if (match) return `https://lh3.googleusercontent.com/d/${match[1]}`
  const ucMatch = url.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/)
  if (ucMatch) return `https://lh3.googleusercontent.com/d/${ucMatch[1]}`
  return url
}

export const getImageUrl = (url, fallback = '/images/placeholder.jpg') => {
  if (!url) return fallback
  if (url.startsWith('http')) return normalizeDriveUrl(url)
  return `https://real-estate-project-production-da1c.up.railway.app${url}`
}

export const classNames = (...classes) =>
  classes.filter(Boolean).join(' ')
