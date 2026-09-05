/* Normalises an image reference to a URL string.

   Vite resolved `import img from './x.jpg'` to a string; Next resolves it to
   a StaticImageData object ({ src, width, height, blurDataURL }). Any plain
   <img src={thatImport}> therefore rendered "[object Object]" after the
   migration. Used where the surrounding markup isn't a safe candidate for
   next/image's `fill` layout. */
export function imgSrc(value, fallback = '') {
  if (!value) return fallback
  if (typeof value === 'string') return value
  if (typeof value === 'object' && typeof value.src === 'string') return value.src
  return fallback
}
