import { Helmet } from 'react-helmet-async'

const SITE = 'Majestique Landmarks'
const DEFAULT_DESC = "Pune's premier luxury real estate developer — delivering landmark residences and commercial spaces for over two decades."
const DEFAULT_IMAGE = '/images/og-image.jpg'

export default function Seo({ title, description, image, noindex = false }) {
  const fullTitle = title ? `${title} | ${SITE}` : `${SITE} | Building Legacies, Crafting Dreams`
  const desc = description || DEFAULT_DESC
  const img = image || DEFAULT_IMAGE

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      {noindex && <meta name="robots" content="noindex,nofollow" />}

      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
    </Helmet>
  )
}
