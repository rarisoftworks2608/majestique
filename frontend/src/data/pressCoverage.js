import { Award, Leaf, Users, Newspaper } from 'lucide-react'

import imgTreePlant     from '../assets/News/Environment_proection.jpeg'
import imgETOrnate      from '../assets/News/ET_Business_Award_News_2023.jpg'
import imgPudhariEco    from '../assets/News/Pudhari.jpeg'
import imgTimesPower    from '../assets/News/Times_Power_Brand.jpg'

/* ── Real clippings sourced from src/assets/Article/ — independent
   third-party reporting only. Brand-authored features, campaign ads,
   and festive greetings live in data/articles.js instead. ────────── */
import imgTimesRealty2025   from '../assets/Article/WhatsApp Image 2025-10-04 at 4.08.16 PM.jpeg'
import imgETBrand2026       from '../assets/Article/WhatsApp Image 2026-01-02 at 12.41.14 PM.jpeg'
import imgETCrown2026       from '../assets/Article/WhatsApp Image 2026-01-02 at 12.41.14 PM (1).jpeg'
import imgSakalRiverClean   from '../assets/Article/WhatsApp Image 2025-06-07 at 10.06.23 AM.jpeg'
import imgLokmatGanesh2025  from '../assets/Article/WhatsApp Image 2025-09-03 at 12.16.55 PM.jpeg'
import pdfTimesPowerBrands2024 from '../assets/Article/TIMES POWER BRANDS PUNE July2024.pdf'
import pdfETOrnate2023      from '../assets/Article/ET BUSINESS AWARDS, DEC 2023.pdf'

export const CATEGORY_META = {
  All:       { icon: Newspaper,  color: '#9d8668' },
  Awards:    { icon: Award,      color: '#c4962a' },
  CSR:       { icon: Leaf,       color: '#2d9d6b' },
  Community: { icon: Users,      color: '#3d6baa' },
}

export const CLIPPINGS = [
  {
    id: 1,
    slug: 'et-business-awards-2023-the-ornate',
    image: imgETOrnate,
    pdf: pdfETOrnate2023,
    publication: 'Economic Times',
    pubColor: '#e8831a',
    category: 'Awards',
    type: 'ET Business Awards 2023',
    headline: "Indulge in Opulent Living at Pune's Prime Residential Hub",
    excerpt:
      'ET Business Awards 2023 special feature on The Ornate by Majestique Landmarks — luxury 3.5, 4 & 5 BHK residences across 3.25 magnificient acres at Baner, Pune.',
    date: 'Dec 29, 2023',
    dateISO: '2023-12-29',
    featured: true,
  },
  {
    id: 2,
    slug: 'times-realty-icons-2025-majestique-towers',
    image: imgTimesRealty2025,
    publication: 'Times of India',
    pubColor: '#d7282f',
    category: 'Awards',
    type: 'Times Realty Icons 2025',
    headline: 'Majestique Towers Wins Excellence in Lifestyle Living',
    excerpt:
      'Times Realty Icons 2025 recognizes Majestique Towers for Excellence in Lifestyle Living — 10 high-rise towers spread across 17 acres, 30+ curated lifestyle amenities, home to 400+ families near EON IT Park, Kharadi.',
    date: 'Oct 4, 2025',
    dateISO: '2025-10-04',
    featured: true,
  },
  {
    id: 3,
    slug: 'times-power-brands-2024-evolvus',
    image: imgTimesPower,
    pdf: pdfTimesPowerBrands2024,
    publication: 'Times Power Brands',
    pubColor: '#d7282f',
    category: 'Awards',
    type: 'Times Power Brands Pune 2024',
    headline: 'Evolvus by Majestique Clinches Iconic Project of the Year 2024',
    excerpt:
      "Kharadi's most aspired township spanning 27+ million sq. ft. honoured with the prestigious Times Power Brands — Iconic Project of the Year 2024 award.",
    date: 'Jul 4, 2024',
    dateISO: '2024-07-04',
    featured: false,
  },
  {
    id: 4,
    slug: 'et-business-awards-2025-iconic-brand',
    image: imgETBrand2026,
    publication: 'Economic Times',
    pubColor: '#e8831a',
    category: 'Awards',
    type: 'ET Business Awards 2025',
    headline: 'A Thoughtful Approach to City-Centric Living',
    excerpt:
      "Majestique Landmarks recognized as Iconic Real Estate Brand of the Year 2025 — profiled for its lifestyle-led development philosophy across Balewadi, Kharadi, NIBM, Hadapsar and Kothrud. The Crown by Majestique also wins Ultra Luxury Residential Project of the Year.",
    date: 'Jan 2, 2026',
    dateISO: '2026-01-02',
    featured: false,
  },
  {
    id: 11,
    slug: 'et-business-awards-2025-the-crown',
    image: imgETCrown2026,
    publication: 'Economic Times',
    pubColor: '#e8831a',
    category: 'Awards',
    type: 'ET Business Awards 2025',
    headline: 'Expansive Homes, Refined Finishes — The Crown',
    excerpt:
      'The Crown by Majestique Landmarks wins Ultra Luxury Residential Project of the Year at the ET Business Awards 2025 — a feature on luxury that prioritizes space and privacy.',
    date: 'Jan 2, 2026',
    dateISO: '2026-01-02',
    featured: false,
  },
  {
    id: 5,
    slug: 'world-environment-day-tree-plantation',
    image: imgTreePlant,
    publication: 'Lokmat',
    pubColor: '#d01b1b',
    category: 'CSR',
    type: 'World Environment Day',
    headline: "Protecting the Environment is Everyone's Duty: Maheshwari",
    excerpt:
      'On World Environment Day, MD Manish Maheshwari leads a tree plantation drive across all Majestique project sites — calling environmental protection a civic responsibility.',
    date: 'Jun 8, 2023',
    dateISO: '2023-06-08',
    featured: false,
  },
  {
    id: 6,
    slug: 'eco-friendly-ganesh-idol-workshops',
    image: imgPudhariEco,
    publication: 'Pudhari',
    pubColor: '#1a3a8a',
    category: 'CSR',
    type: 'Eco Initiative',
    headline: '500 Citizens Trained in Eco-Friendly Ganesh Idol Making',
    excerpt:
      "Majestique Landmarks organizes 5 workshops training 500+ citizens to create eco-friendly Ganesh idols across project sites — spreading environmental awareness.",
    date: '2024',
    dateISO: '2024-08-01',
    featured: false,
  },
  {
    id: 7,
    slug: 'badlav-by-majestique-riverfront-clean-up',
    image: imgSakalRiverClean,
    publication: 'Sakal',
    pubColor: '#1a6b1a',
    category: 'CSR',
    type: "Badlav By Majestique",
    headline: 'Majestique Volunteers Clean S.M. Joshi Bridge Riverfront',
    excerpt:
      "Under 'Badlav By Majestique', 40+ volunteers clean the S.M. Joshi bridge area on World Environment Day — reaffirming the brand's commitment to a sustainable Pune.",
    date: 'Jun 7, 2025',
    dateISO: '2025-06-07',
    featured: false,
  },
  {
    id: 8,
    slug: 'ganesh-mahotsav-community-celebration-2025',
    image: imgLokmatGanesh2025,
    publication: 'Lokmat',
    pubColor: '#d01b1b',
    category: 'Community',
    type: 'Community Celebration',
    headline: 'Grand Ganesh Mahotsav Across Majestique Communities',
    excerpt:
      'Majestique Landmarks communities unite in joyous Ganesh Mahotsav 2025 celebrations — dhol-tasha performances, cultural events, and festive bonding across all projects.',
    date: 'Sep 3, 2025',
    dateISO: '2025-09-03',
    featured: false,
  },
]

export const CATEGORIES = ['All', 'Awards', 'CSR', 'Community']

export const PUBLICATIONS = [
  { abbr: 'ET',  name: 'Economic Times',   color: '#e8831a' },
  { abbr: 'TOI', name: 'Times of India',   color: '#d7282f' },
  { abbr: 'LK',  name: 'Lokmat',           color: '#d01b1b' },
  { abbr: 'PD',  name: 'Pudhari',          color: '#1a3a8a' },
  { abbr: 'SK',  name: 'Sakal',            color: '#1a6b1a' },
]
