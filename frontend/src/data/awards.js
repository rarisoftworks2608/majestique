import { Trophy, Crown, Gem, Building2, Landmark, Megaphone, Award, Star, Zap, Medal, Newspaper } from 'lucide-react'

/* ── Image imports — sourced directly from src/assets/Awards/ ─────── */
import imgTPB2026a       from '../assets/Awards/Times Power Brand Award/2026/DSC_9388.JPG'
import imgTPB2026b       from '../assets/Awards/Times Power Brand Award/2026/DSC_9396.JPG'
import imgTPB2026c       from '../assets/Awards/Times Power Brand Award/2026/WhatsApp Image 2026-06-27 at 3.01.22 PM.jpeg'
import imgTPB2026d       from '../assets/Awards/Times Power Brand Award/2026/WhatsApp Image 2026-06-27 at 4.43.18 PM.jpeg'
import imgRealtyPlus2026a from '../assets/Awards/Realty +/APR 2026/IMGL9814.JPG'
import imgRealtyPlus2026b from '../assets/Awards/Realty +/APR 2026/IMGL9832.JPG'
import imgET2025a        from '../assets/Awards/ET Bussines award/DEC 2025/WhatsApp Image 2025-12-20 at 1.42.46 PM.jpeg'
import imgET2025b        from '../assets/Awards/ET Bussines award/DEC 2025/WhatsApp Image 2025-12-20 at 1.42.46 PM (1).jpeg'
import imgET2025c        from '../assets/Awards/ET Bussines award/DEC 2025/WhatsApp Image 2025-12-20 at 1.43.33 PM.jpeg'
import imgET2025d        from '../assets/Awards/ET Bussines award/DEC 2025/WhatsApp Image 2025-12-20 at 1.43.34 PM.jpeg'
import imgTRI2025a       from '../assets/Awards/Times Realty Icon/OCT 2025/DSC_9212.JPG'
import imgTRI2025b       from '../assets/Awards/Times Realty Icon/OCT 2025/WhatsApp Image 2025-09-20 at 2.40.34 PM.jpeg'
import imgTRI2025c       from '../assets/Awards/Times Realty Icon/OCT 2025/WhatsApp Image 2025-09-20 at 2.40.34 PM (1).jpeg'
import imgTPB2025        from '../assets/Awards/Times Power Brand Award/2025/DSC_4258.JPG'
import imgET2024         from '../assets/Awards/ET Bussines award/DEC 2024/ET_Business_Award_2024.jpeg'
import imgTRI2024        from '../assets/Awards/Times Realty Icon/SEP 2024/Times_reality_icon_sep_2024.jpg'
import imgET2023Cert     from '../assets/Awards/ET Bussines award/ET BUSINESS AWARDS, DEC 2023.pdf'
import imgTRI2021        from '../assets/Awards/Times Realty Icon/2021/Times Realty Icons_2021.jpeg'
import imgOMS2018        from '../assets/Awards/Optimal Media Solutions/Optimal Media Solutions_2018.jpeg'
import imgNBA2018a       from '../assets/Awards/Navbharat Business Achievers Award/Navbharat Business Achievers Award 2018_1.jpg'
import imgNBA2018b       from '../assets/Awards/Navbharat Business Achievers Award/Navbharat Business Achievers Award 2018_2.jpg'
import imgNBA2018c       from '../assets/Awards/Navbharat Business Achievers Award/Navbharat Business Achievers Award 2018_3.jpg'
import imgRealtyNest     from '../assets/Awards/Budget Housing Project Of the Year.jpeg'
import imgOrnate2023a    from '../assets/Awards/Iconic Luxury Project of the Year 2023/Iconic Luxury Project of the Year_2023.jpg'
import imgOrnate2023b    from '../assets/Awards/Iconic Luxury Project of the Year 2023/Iconic Luxury Project of the Year_2023_2.jpg'
import imgOrnate2023c    from '../assets/Awards/Iconic Luxury Project of the Year 2023/Iconic Luxury Project of the Year_2023_3.jpg'
import imgMostPromising2023a from '../assets/Awards/Most Promising Real Estate Brand_2023/Most Promising Real Estate Brand_2023_1.jpg'
import imgMostPromising2023b from '../assets/Awards/Most Promising Real Estate Brand_2023/Most Promising Real Estate Brand_2023_2.jpg'
import imgMostPromising2023c from '../assets/Awards/Most Promising Real Estate Brand_2023/Most Promising Real Estate Brand_2023_3.jpg'

/* ── Bonus gallery photos — project launch/ceremony shots from src/assets/Event/ ── */
import imgKrutarthEvent1 from '../assets/Event/Krutarth/Vishwasaarambh/0GZ_9938.JPG'
import imgKrutarthEvent2 from '../assets/Event/Krutarth/Vishwasaarambh/OMI30195.JPG'
import imgEvolvusEvent1  from '../assets/Event/Evolvus/Launch 2024/VRP_2391.JPG'
import imgEvolvusEvent2  from '../assets/Event/Evolvus/Launch 2024/VRP_2401.JPG'
import imgOrnateEvent1   from '../assets/Event/Ornate/Launch/0P0A1176.jpg'
import imgOrnateEvent2   from '../assets/Event/Ornate/Launch/0P0A1233.jpg'

/* ── Coarse recognition types — used for the filter chips ─────────── */
export const CATEGORY_META = {
  All:       { icon: Trophy,    color: '#9d8668' },
  Brand:     { icon: Crown,     color: '#c4962a' },
  Lifestyle: { icon: Gem,       color: '#3d6baa' },
  Developer: { icon: Building2, color: '#2d9d6b' },
  Project:   { icon: Landmark,  color: '#9d5a3d' },
  Marketing: { icon: Megaphone, color: '#7a3fa0' },
}

export const CATEGORIES = ['All', 'Brand', 'Lifestyle', 'Developer', 'Project', 'Marketing']

/* ── Award platforms / editions — used for the publication chip ───── */
export const PLATFORM_META = {
  'ET Business Awards':               { abbr: 'ET',  icon: Award,      color: '#e8831a' },
  'Times Power Brands':               { abbr: 'TPB', icon: Zap,        color: '#d7282f' },
  'Times Realty Icons':               { abbr: 'TRI', icon: Star,       color: '#1a3a8a' },
  'Realty+ Excellence Awards':        { abbr: 'R+',  icon: Gem,        color: '#0f7a7a' },
  'Navbharat Business Achievers Award': { abbr: 'NBA', icon: Medal,    color: '#7a3fa0' },
  'Optimal Media Solutions':          { abbr: 'OMS', icon: Megaphone,  color: '#b8860b' },
  'Pune Times Mirror':                { abbr: 'PTM', icon: Newspaper,  color: '#5c4d3d' },
}

export const PLATFORMS = Object.entries(PLATFORM_META).map(([name, meta]) => ({ name, ...meta }))

/* ── All awards — sourced from the official award register + majestiqueproperties.com/awards-recognition ── */
export const AWARDS = [
  /* 2026 — Times Power Brands (June 2026) */
  { id: 1,  slug: 'times-power-brands-trusted-real-estate-brand-2026',
    year: 2026, date: 'June 2026', image: imgTPB2026a, gallery: [imgTPB2026c, imgTPB2026d],
    award: 'Trusted Real Estate Brand', platform: 'Times Power Brands', project: 'Majestique Landmarks',
    category: 'Brand',
    desc: 'Majestique Landmarks honoured as a Trusted Real Estate Brand at the Times Power Brands 2026 awards — recognising a legacy built on transparency, delivery discipline and lasting customer confidence.' },
  { id: 2,  slug: 'times-power-brands-creative-innovation-marketing-2026',
    year: 2026, date: 'June 2026', image: imgTPB2026b, gallery: [imgTPB2026c, imgTPB2026d],
    award: 'Creative Innovation in Real Estate Marketing', platform: 'Times Power Brands', project: 'Marketing',
    category: 'Marketing',
    desc: 'Recognised for pioneering, design-led marketing campaigns that bring Majestique’s luxury developments to life across Pune — celebrated at the Times Power Brands 2026 awards.' },

  /* 2026 — Realty+ Excellence Awards (April 2026) */
  { id: 3,  slug: 'realty-plus-iconic-redevelopment-krutarth-2026',
    year: 2026, date: 'April 2026', image: imgRealtyPlus2026a, gallery: [imgKrutarthEvent1, imgKrutarthEvent2],
    award: 'Iconic Redevelopment Project of the Year', platform: 'Realty+ Excellence Awards', project: 'Krutarth',
    category: 'Project',
    desc: 'Krutarth by Majestique Landmarks wins Iconic Redevelopment Project of the Year at the Realty+ Excellence Awards 2026 — honouring thoughtful, community-first urban renewal.' },
  { id: 4,  slug: 'realty-plus-ultra-luxury-lifestyle-evolvus-2026',
    year: 2026, date: 'April 2026', image: imgRealtyPlus2026b, gallery: [imgEvolvusEvent1, imgEvolvusEvent2],
    award: 'Ultra Luxury Lifestyle Project of the Year', platform: 'Realty+ Excellence Awards', project: 'Evolvus',
    category: 'Lifestyle',
    desc: 'Evolvus at Kharadi is named Ultra Luxury Lifestyle Project of the Year at the Realty+ Excellence Awards 2026, celebrating its 27M+ sq. ft. township vision and curated lifestyle ecosystem.' },

  /* 2025 — ET Business Awards (December 2025) */
  { id: 5,  slug: 'et-business-iconic-real-estate-brand-2025',
    year: 2025, date: 'December 2025', image: imgET2025a, gallery: [imgET2025b],
    award: 'Iconic Real Estate Brand of the Year', platform: 'ET Business Awards', project: 'Majestique Landmarks',
    category: 'Brand',
    desc: 'Honoured by ET Business Awards for continued dedication to excellence, innovation, and shaping the future of real estate across Pune.' },
  { id: 6,  slug: 'et-business-luxury-lifestyle-living-crown-2025',
    year: 2025, date: 'December 2025', image: imgET2025c, gallery: [imgET2025d],
    award: 'Excellence in Luxury Lifestyle Living', platform: 'ET Business Awards', project: 'The Crown',
    category: 'Lifestyle',
    desc: 'The Crown by Majestique Landmarks receives Excellence in Luxury Lifestyle Living at the ET Business Awards 2025 — celebrating elevated, sophisticated, community-driven living.' },

  /* 2025 — Times Realty Icons (September 2025) */
  { id: 7,  slug: 'times-realty-icons-lifestyle-living-towers-2025',
    year: 2025, date: 'September 2025', image: imgTRI2025a, gallery: [imgTRI2025b, imgTRI2025c],
    award: 'Excellence in Lifestyle Living', platform: 'Times Realty Icons', project: 'Majestique Towers',
    category: 'Lifestyle',
    desc: 'Majestique Towers recognised for crafting residential experiences that offer an elevated and luxurious lifestyle — honoured at Times Realty Icons 2025.' },

  /* 2025 — Times Power Brands (July 2025) */
  { id: 8,  slug: 'times-power-brands-esteemed-developer-2025',
    year: 2025, date: 'July 2025', image: imgTPB2025,
    award: 'Esteemed Developer of the Year', platform: 'Times Power Brands', project: 'Majestique Landmarks',
    category: 'Developer',
    desc: 'Times Power Brands 2025 honours Majestique’s commitment to design excellence, purposeful living, and unwavering customer trust.' },

  /* 2024 — Economic Times (December 2024) */
  { id: 9,  slug: 'economic-times-real-estate-developer-of-the-year-2024',
    year: 2024, date: 'December 2024', image: imgET2024,
    award: 'Real Estate Developer of the Year', platform: 'ET Business Awards', project: 'Majestique Landmarks',
    category: 'Developer',
    desc: 'Economic Times acknowledges Majestique Landmarks’ unwavering commitment to excellence and innovation across a decade of development in Pune.' },

  /* 2024 — Times Realty Icons Maharashtra (September 2024) */
  { id: 10, slug: 'times-realty-icons-upcoming-signature-luxury-nfs-2024',
    year: 2024, date: 'September 2024', image: imgTRI2024,
    award: 'Upcoming Signature Luxury Project', platform: 'Times Realty Icons', project: 'New Friends Society, Kothrud',
    category: 'Project',
    desc: 'New Friends Society, Kothrud is recognised at Times Realty Icons Maharashtra 2024 for its premium design philosophy and elevated lifestyle vision.' },

  /* 2023 — Economic Times (December 2023) */
  { id: 11, slug: 'economic-times-iconic-luxury-project-ornate-2023',
    year: 2023, date: 'December 2023', image: imgOrnate2023a, gallery: [imgOrnate2023b, imgOrnate2023c, imgOrnateEvent1, imgOrnateEvent2], certificate: imgET2023Cert,
    award: 'Iconic Luxury Project of the Year', platform: 'ET Business Awards', project: 'The Ornate',
    category: 'Project',
    desc: 'The Ornate is honoured as Iconic Luxury Project of the Year at the ET Business Awards 2023 — recognition for setting new benchmarks in luxury living.' },

  /* 2023 — Times Power Brand (July 2023) */
  { id: 12, slug: 'times-power-brand-most-promising-real-estate-brand-2023',
    year: 2023, date: 'July 2023', image: imgMostPromising2023a, gallery: [imgMostPromising2023b, imgMostPromising2023c],
    award: 'Most Promising Real Estate Brand of the Year', platform: 'Times Power Brands', project: 'Majestique Landmarks',
    category: 'Brand',
    desc: 'Times Group’s Times Power Brand Pune 2023 names Majestique among the most promising real estate brands, acknowledging rapid, disciplined growth across the city.' },

  /* 2021 — Times Realty Icons */
  { id: 13, slug: 'times-realty-icons-best-developer-residential-2021',
    year: 2021, date: '2021', image: imgTRI2021,
    award: 'The Best Developer – Residential', platform: 'Times Realty Icons', project: 'Majestique Landmarks',
    category: 'Developer',
    desc: 'Honoured for delivering premium residential experiences with unwavering quality and trust at Times Realty Icons 2021.' },

  /* 2018 — Optimal Media Solutions */
  { id: 14, slug: 'optimal-media-solutions-commercial-project-rhythm-county-2018',
    year: 2018, date: '2018', image: imgOMS2018,
    award: 'Commercial Project of the Year', platform: 'Optimal Media Solutions', project: 'Majestique Rhythm County',
    category: 'Project',
    desc: 'Majestique Rhythm County recognised for excellence in commercial and integrated development planning by Optimal Media Solutions, 2018.' },

  /* 2018 — Navbharat Business Achievers Award */
  { id: 15, slug: 'navbharat-residential-developer-of-the-year-2018',
    year: 2018, date: '2018', image: imgNBA2018a, gallery: [imgNBA2018b, imgNBA2018c],
    award: 'Residential Awards — Winner, Developer of the Year', platform: 'Navbharat Business Achievers Award', project: 'Majestique Landmarks',
    category: 'Developer',
    desc: 'Presented by then Chief Minister of Maharashtra, Shri Devendra Fadnavis — recognising residential development excellence at the Navbharat Business Achievers Award 2018.' },

  /* 2016 — Times Realty Icon */
  { id: 16, slug: 'times-realty-icon-recognition-2016',
    year: 2016, date: '2016', image: null,
    award: 'Times Realty Icon Recognition', platform: 'Times Realty Icons', project: 'Majestique Landmarks',
    category: 'Developer',
    desc: 'An early Times Realty Icon citation recognising Majestique Landmarks’ emerging reputation for quality-driven residential development in Pune.' },

  /* 2016 — Pune Times Mirror */
  { id: 17, slug: 'pune-times-mirror-mrugavarsha-2016',
    year: 2016, date: '2016', image: null,
    award: 'Pune Mirror Recognition', platform: 'Pune Times Mirror', project: 'Majestique Mrugavarsha',
    category: 'Project',
    desc: 'Majestique Mrugavarsha featured and recognised by Pune Times Mirror, 2016, for its distinctive project vision.' },

  /* Undated — Realty+ Awards */
  { id: 18, slug: 'realty-plus-budget-housing-majestique-nest',
    year: null, date: 'Legacy Recognition', image: imgRealtyNest,
    award: 'Budget Housing Project of the Year', platform: 'Realty+ Excellence Awards', project: 'Majestique Nest',
    category: 'Project',
    desc: 'Majestique Nest recognised by Realty+ Awards for delivering exceptional, value-driven residential living.' },
]

export const STATS = [
  { value: `${AWARDS.length}+`, label: 'Industry Awards',    icon: Trophy },
  { value: `${PLATFORMS.length}`, label: 'Award Platforms',  icon: Star   },
  { value: `${new Set(AWARDS.filter(a => a.year).map(a => a.year)).size}`, label: 'Years Recognised', icon: Award },
  { value: `${CATEGORIES.length - 1}`, label: 'Award Categories', icon: Gem },
]
