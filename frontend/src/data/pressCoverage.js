import { Award, Leaf, Users, Megaphone, Newspaper } from 'lucide-react'

import imgLokmatAd      from '../assets/News/live_Majestique_lokmat.jpeg'
import imgTreePlant     from '../assets/News/Environment_proection.jpeg'
import imgETOrnate      from '../assets/News/ET_Business_Award_News_2023.jpg'
import imgPudhariEco    from '../assets/News/Pudhari.jpeg'
import imgTimesPower    from '../assets/News/Times_Power_Brand.jpg'

/* ── Real clippings sourced from src/assets/Article/ ────────────── */
import imgTimesRealty2025   from '../assets/Article/WhatsApp Image 2025-10-04 at 4.08.16 PM.jpeg'
import imgETBrand2026       from '../assets/Article/WhatsApp Image 2026-01-02 at 12.41.14 PM.jpeg'
import imgETCrown2026       from '../assets/Article/WhatsApp Image 2026-01-02 at 12.41.14 PM (1).jpeg'
import imgSakalRiverClean   from '../assets/Article/WhatsApp Image 2025-06-07 at 10.06.23 AM.jpeg'
import imgLokmatGanesh2025  from '../assets/Article/WhatsApp Image 2025-09-03 at 12.16.55 PM.jpeg'
import imgPudhariMyPune2026 from '../assets/Article/WhatsApp Image 2026-01-03 at 10.58.28 AM.jpeg'
import imgPuneTimesMay2026  from '../assets/Article/08052026_pt_mp_04_1_col_r2.jpg.jpeg'
import imgSakalNewFriends   from '../assets/Article/WhatsApp Image 2025-12-24 at 7.09.26 PM.jpeg'
import pdfSaamanaGudiPadwa  from '../assets/Article/20260314_1 (1).PDF'
import pdfLokmatAnniversary from '../assets/Article/LOKMAT NEWS PAPER_33CMx45CM_PRINT FILE_06.01.2026.pdf'
import pdfSakalKargilVijay  from '../assets/Article/Pune_Today-Pune-Sakal-PuneSpecial-A-26072025-3.pdf'
import pdfSakalValentine    from '../assets/Article/Pune_Today-Pune-Sakal-SakalVastu-A-.pdf'
import pdfTimesPowerBrands2024 from '../assets/Article/TIMES POWER BRANDS PUNE July2024.pdf'
import pdfETOrnate2023      from '../assets/Article/ET BUSINESS AWARDS, DEC 2023.pdf'

/* ── Thumbnails rendered from the PDF-only clippings above (first page) ── */
import imgSaamanaGudiPadwa   from '../assets/Article/Saamana_GudiPadwa_2026.jpg'
import imgLokmatAnniversary  from '../assets/Article/Lokmat_Anniversary_2026.jpg'
import imgSakalKargilVijay   from '../assets/Article/Sakal_KargilVijayDiwas_2025.jpg'
import imgSakalValentine     from '../assets/Article/Sakal_Valentine_2026.jpg'

export const CATEGORY_META = {
  All:       { icon: Newspaper,  color: '#9d8668' },
  Awards:    { icon: Award,      color: '#c4962a' },
  CSR:       { icon: Leaf,       color: '#2d9d6b' },
  Community: { icon: Users,      color: '#3d6baa' },
  Brand:     { icon: Megaphone,  color: '#9d8668' },
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
    id: 12,
    slug: 'pune-times-luxury-developments-modern-urban-living',
    image: imgPuneTimesMay2026,
    publication: 'Times of India',
    pubColor: '#d7282f',
    category: 'Brand',
    type: 'Pune Times Feature',
    headline: 'Luxury Development Projects Crafted for Modern Urban Living',
    excerpt:
      "A full-page Pune Times feature on Majestique Landmarks' 20-year journey — nearly 15,000 homes delivered, 20,000+ happy families, ~30 completed projects and 18 crore+ sq. ft. ongoing across Kharadi, Balewadi, Baner, Kothrud, Hadapsar and NIBM Annexe, with MD Manish Maheshwari on trust, consistency, and the Badlaav By Majestique river-cleaning initiative.",
    date: 'May 8, 2026',
    dateISO: '2026-05-08',
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
  {
    id: 9,
    slug: 'lokmat-live-majestique-brand-feature',
    image: imgLokmatAd,
    publication: 'Lokmat',
    pubColor: '#d01b1b',
    category: 'Brand',
    type: 'Brand Feature',
    headline: 'केवळ घर नव्हे — एक समृद्ध जीवनशैली! Live Majestique.',
    excerpt:
      '18,000+ Happy Families · 30+ Delivered Projects · 18+ Ongoing Projects · 2 Cr+ Sq. ft. Ongoing. A landmark in Pune real estate since 2002.',
    date: '2024',
    dateISO: '2024-06-01',
    featured: false,
  },
  {
    id: 10,
    slug: 'pudhari-my-pune-brand-feature',
    image: imgPudhariMyPune2026,
    publication: 'Pudhari',
    pubColor: '#1a3a8a',
    category: 'Brand',
    type: 'Brand Feature',
    headline: "Witness of Pune's Transformation — Live Majestique.",
    excerpt:
      "बदलत्या पुण्याचे प्रगल्भ साक्षीदार! Majestique Landmarks: Pune's pioneering real estate brand — 18,000+ families, 30+ delivered projects across all four zones of Pune.",
    date: 'Jan 3, 2026',
    dateISO: '2026-01-03',
    featured: false,
  },
  {
    id: 13,
    slug: 'sakal-new-friends-gudi-padwa-offer',
    image: imgSakalNewFriends,
    publication: 'Sakal',
    pubColor: '#1a6b1a',
    category: 'Brand',
    type: 'Brand Feature',
    headline: 'Gudi Padwa Special Offer — New Friends, Kothrud',
    excerpt:
      "Sakal Pune features New Friends by Majestique — 27-storey, 5 towers, 3-level lifestyle amenities, next to Vanaz Metro Station, Kothrud — with a Gudi Padwa EMI holiday offer.",
    date: 'Mar 21, 2025',
    dateISO: '2025-03-21',
    featured: false,
  },
  {
    id: 14,
    slug: 'saamana-gudi-padwa-brand-feature-2026',
    image: imgSaamanaGudiPadwa,
    pdf: pdfSaamanaGudiPadwa,
    publication: 'Saamana',
    pubColor: '#c0392b',
    category: 'Brand',
    type: 'Brand Feature',
    headline: 'Gudi Padwa Greetings — Live Majestique',
    excerpt:
      "Saamana's Marathi New Year brand feature — Majestique Landmarks: 18,000+ happy families, 30+ delivered projects, 18+ ongoing projects, over 20 years of trust across Pune.",
    date: 'Mar 14, 2026',
    dateISO: '2026-03-14',
    featured: false,
  },
  {
    id: 15,
    slug: 'lokmat-anniversary-brand-feature-2026',
    image: imgLokmatAnniversary,
    pdf: pdfLokmatAnniversary,
    publication: 'Lokmat',
    pubColor: '#d01b1b',
    category: 'Brand',
    type: 'Brand Feature',
    headline: 'Lokmat Anniversary Special — Live Majestique',
    excerpt:
      "A Lokmat anniversary-edition brand feature celebrating Majestique Landmarks — 18,000+ happy families, 30+ delivered and 18+ ongoing projects across Pune.",
    date: 'Jan 6, 2026',
    dateISO: '2026-01-06',
    featured: false,
  },
  {
    id: 16,
    slug: 'sakal-kargil-vijay-diwas-tribute-2025',
    image: imgSakalKargilVijay,
    pdf: pdfSakalKargilVijay,
    publication: 'Sakal',
    pubColor: '#1a6b1a',
    category: 'Community',
    type: 'Brand Feature',
    headline: 'Kargil Vijay Diwas Tribute — Where There Is Righteousness, There Is Victory',
    excerpt:
      "Sakal Property Today carries Majestique Landmarks' Kargil Vijay Diwas tribute — honouring 60 days of valor, 30,000 warriors of the nation, at 18,000 ft altitude.",
    date: 'Jul 26, 2025',
    dateISO: '2025-07-26',
    featured: false,
  },
  {
    id: 17,
    slug: 'sakal-valentines-day-brand-feature-2026',
    image: imgSakalValentine,
    pdf: pdfSakalValentine,
    publication: 'Sakal',
    pubColor: '#1a6b1a',
    category: 'Brand',
    type: 'Brand Feature',
    headline: 'Live Majestique. Love Majestique.',
    excerpt:
      "Sakal Property Today's Valentine's Day feature — 20 years of enduring trust, built across Pune, beautifully, in every detail.",
    date: 'Feb 14, 2026',
    dateISO: '2026-02-14',
    featured: false,
  },
]

export const CATEGORIES = ['All', 'Awards', 'CSR', 'Community', 'Brand']

export const PUBLICATIONS = [
  { abbr: 'ET',  name: 'Economic Times',   color: '#e8831a' },
  { abbr: 'TOI', name: 'Times of India',   color: '#d7282f' },
  { abbr: 'LK',  name: 'Lokmat',           color: '#d01b1b' },
  { abbr: 'PD',  name: 'Pudhari',          color: '#1a3a8a' },
  { abbr: 'SK',  name: 'Sakal',            color: '#1a6b1a' },
  { abbr: 'SM',  name: 'Saamana',          color: '#c0392b' },
]
