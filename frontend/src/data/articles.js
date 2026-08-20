import { Megaphone, Sparkles, Gift, Award } from 'lucide-react'

/* ── Brand-authored articles, campaigns & features — sourced from
   src/assets/Article/. These are pieces Majestique commissioned or
   published itself (paid placements, festive greetings, brand profiles),
   as distinct from the independent third-party reporting on the
   Press Coverage page. ──────────────────────────────────────────── */
import imgLokmatAd          from '../assets/News/live_Majestique_lokmat.jpeg'
import imgPuneTimesMay2026  from '../assets/Article/08052026_pt_mp_04_1_col_r2.jpg.jpeg'
import imgPudhariMyPune2026 from '../assets/Article/WhatsApp Image 2026-01-03 at 10.58.28 AM.jpeg'
import imgSakalNewFriends   from '../assets/Article/WhatsApp Image 2025-12-24 at 7.09.26 PM.jpeg'
import imgSaamanaGudiPadwa  from '../assets/Article/Saamana_GudiPadwa_2026.jpg'
import pdfSaamanaGudiPadwa  from '../assets/Article/20260314_1 (1).PDF'
import imgLokmatAnniversary from '../assets/Article/Lokmat_Anniversary_2026.jpg'
import pdfLokmatAnniversary from '../assets/Article/LOKMAT NEWS PAPER_33CMx45CM_PRINT FILE_06.01.2026.pdf'
import imgSakalKargilVijay  from '../assets/Article/Sakal_KargilVijayDiwas_2025.jpg'
import pdfSakalKargilVijay  from '../assets/Article/Pune_Today-Pune-Sakal-PuneSpecial-A-26072025-3.pdf'
import imgSakalValentine    from '../assets/Article/Sakal_Valentine_2026.jpg'
import pdfSakalValentine    from '../assets/Article/Pune_Today-Pune-Sakal-SakalVastu-A-.pdf'

export const ARTICLE_CATEGORY_META = {
  All:               { icon: Sparkles,  color: '#D4AF37' },
  'Brand Campaign':  { icon: Megaphone, color: '#9d5a3d' },
  'Festive Greetings': { icon: Gift,    color: '#c4962a' },
  'Special Feature': { icon: Award,     color: '#3d6baa' },
}

export const ARTICLE_CATEGORIES = ['All', 'Brand Campaign', 'Festive Greetings', 'Special Feature']

export const ARTICLES = [
  {
    id: 1,
    slug: 'pune-times-luxury-developments-modern-urban-living',
    image: imgPuneTimesMay2026,
    publication: 'Times of India',
    pubColor: '#d7282f',
    category: 'Special Feature',
    type: 'Pune Times Feature',
    headline: 'Luxury Development Projects Crafted for Modern Urban Living',
    excerpt:
      "A full-page Pune Times feature on Majestique Landmarks' 20-year journey: nearly 15,000 homes delivered, 20,000+ happy families, ~30 completed projects and 18 crore+ sq. ft. ongoing across Kharadi, Balewadi, Baner, Kothrud, Hadapsar and NIBM Annexe, with MD Manish Maheshwari on trust, consistency, and the Badlaav By Majestique river-cleaning initiative.",
    date: 'May 8, 2026',
    dateISO: '2026-05-08',
    featured: true,
  },
  {
    id: 2,
    slug: 'lokmat-anniversary-brand-feature-2026',
    image: imgLokmatAnniversary,
    pdf: pdfLokmatAnniversary,
    publication: 'Lokmat',
    pubColor: '#d01b1b',
    category: 'Special Feature',
    type: 'Anniversary Feature',
    headline: 'Lokmat Anniversary Special: Live Majestique',
    excerpt:
      "A Lokmat anniversary-edition brand feature celebrating Majestique Landmarks: 18,000+ happy families, 30+ delivered and 18+ ongoing projects across Pune.",
    date: 'Jan 6, 2026',
    dateISO: '2026-01-06',
    featured: false,
  },
  {
    id: 3,
    slug: 'sakal-kargil-vijay-diwas-tribute-2025',
    image: imgSakalKargilVijay,
    pdf: pdfSakalKargilVijay,
    publication: 'Sakal',
    pubColor: '#1a6b1a',
    category: 'Special Feature',
    type: 'Tribute Feature',
    headline: 'Kargil Vijay Diwas Tribute: Where There Is Righteousness, There Is Victory',
    excerpt:
      "Sakal Property Today carries Majestique Landmarks' Kargil Vijay Diwas tribute, honouring 60 days of valor, 30,000 warriors of the nation, at 18,000 ft altitude.",
    date: 'Jul 26, 2025',
    dateISO: '2025-07-26',
    featured: false,
  },
  {
    id: 4,
    slug: 'lokmat-live-majestique-brand-feature',
    image: imgLokmatAd,
    publication: 'Lokmat',
    pubColor: '#d01b1b',
    category: 'Brand Campaign',
    type: 'Brand Feature',
    headline: 'केवळ घर नव्हे, एक समृद्ध जीवनशैली! Live Majestique.',
    excerpt:
      '18,000+ Happy Families · 30+ Delivered Projects · 18+ Ongoing Projects · 2 Cr+ Sq. ft. Ongoing. A landmark in Pune real estate since 2002.',
    date: '2024',
    dateISO: '2024-06-01',
    featured: false,
  },
  {
    id: 5,
    slug: 'pudhari-my-pune-brand-feature',
    image: imgPudhariMyPune2026,
    publication: 'Pudhari',
    pubColor: '#1a3a8a',
    category: 'Brand Campaign',
    type: 'Brand Feature',
    headline: "Witness of Pune's Transformation: Live Majestique.",
    excerpt:
      "बदलत्या पुण्याचे प्रगल्भ साक्षीदार! Majestique Landmarks: Pune's pioneering real estate brand, 18,000+ families, 30+ delivered projects across all four zones of Pune.",
    date: 'Jan 3, 2026',
    dateISO: '2026-01-03',
    featured: false,
  },
  {
    id: 6,
    slug: 'sakal-new-friends-gudi-padwa-offer',
    image: imgSakalNewFriends,
    publication: 'Sakal',
    pubColor: '#1a6b1a',
    category: 'Festive Greetings',
    type: 'Brand Feature',
    headline: 'Gudi Padwa Special Offer: New Friends, Kothrud',
    excerpt:
      "Sakal Pune features New Friends by Majestique: 27-storey, 5 towers, 3-level lifestyle amenities, next to Vanaz Metro Station, Kothrud, with a Gudi Padwa EMI holiday offer.",
    date: 'Mar 21, 2025',
    dateISO: '2025-03-21',
    featured: false,
  },
  {
    id: 7,
    slug: 'saamana-gudi-padwa-brand-feature-2026',
    image: imgSaamanaGudiPadwa,
    pdf: pdfSaamanaGudiPadwa,
    publication: 'Saamana',
    pubColor: '#c0392b',
    category: 'Festive Greetings',
    type: 'Brand Feature',
    headline: 'Gudi Padwa Greetings: Live Majestique',
    excerpt:
      "Saamana's Marathi New Year brand feature, Majestique Landmarks: 18,000+ happy families, 30+ delivered projects, 18+ ongoing projects, over 20 years of trust across Pune.",
    date: 'Mar 14, 2026',
    dateISO: '2026-03-14',
    featured: false,
  },
  {
    id: 8,
    slug: 'sakal-valentines-day-brand-feature-2026',
    image: imgSakalValentine,
    pdf: pdfSakalValentine,
    publication: 'Sakal',
    pubColor: '#1a6b1a',
    category: 'Festive Greetings',
    type: 'Brand Feature',
    headline: 'Live Majestique. Love Majestique.',
    excerpt:
      "Sakal Property Today's Valentine's Day feature: 20 years of enduring trust, built across Pune, beautifully, in every detail.",
    date: 'Feb 14, 2026',
    dateISO: '2026-02-14',
    featured: false,
  },
]

export const ARTICLE_PUBLICATIONS = [
  { abbr: 'TOI', name: 'Times of India', color: '#d7282f' },
  { abbr: 'LK',  name: 'Lokmat',         color: '#d01b1b' },
  { abbr: 'PD',  name: 'Pudhari',        color: '#1a3a8a' },
  { abbr: 'SK',  name: 'Sakal',          color: '#1a6b1a' },
  { abbr: 'SM',  name: 'Saamana',        color: '#c0392b' },
]
